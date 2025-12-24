#!/bin/sh

echo "Waiting for postgres..."
# Simple wait loop for database (optional but recommended)
# while ! nc -z db 5432; do
#   sleep 0.1
# done
echo "PostgreSQL started"

echo "Applying migrations..."
python manage.py migrate --noinput

echo "Seeding database..."
python seed.py

echo "Starting server..."
# Check if DEBUG is set to True
if [ "$DEBUG" = "True" ]; then
    echo "Running in DEBUG mode (runserver)..."
    python manage.py runserver 0.0.0.0:8000
else
    echo "Running in PRODUCTION mode (gunicorn)..."
    gunicorn studycheck.wsgi:application --bind 0.0.0.0:8000 --workers 3
fi