import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'studycheck.settings')
django.setup()

from areas.models import StudyArea, ChecklistTemplate, ChecklistTemplateItem

def seed():
    # Study Areas
    backend, _ = StudyArea.objects.get_or_create(name='Backend', slug='backend', description='Server-side development')
    frontend, _ = StudyArea.objects.get_or_create(name='Frontend', slug='frontend', description='Client-side development')
    devops, _ = StudyArea.objects.get_or_create(name='DevOps', slug='devops', description='Infrastructure and automation')

    # Backend Template
    be_junior, _ = ChecklistTemplate.objects.get_or_create(
        title='Junior Backend Developer',
        area=backend,
        level='junior',
        description='Core concepts for a junior backend developer.'
    )

    be_items = [
        ('HTTP Fundamentals', 'Methods, status codes, headers'),
        ('Relational Databases', 'SQL basics, joins, normalization'),
        ('REST APIs', 'Principles, JSON, statelessness'),
        ('Authentication', 'JWT, sessions, cookies'),
        ('Testing', 'Unit tests, integration tests')
    ]

    for i, (title, desc) in enumerate(be_items):
        ChecklistTemplateItem.objects.get_or_create(
            template=be_junior,
            title=title,
            description=desc,
            order=i
        )

    # Frontend Template
    fe_junior, _ = ChecklistTemplate.objects.get_or_create(
        title='Junior Frontend Developer',
        area=frontend,
        level='junior',
        description='Core concepts for a junior frontend developer.'
    )

    fe_items = [
        ('HTML5 Semantic Tags', 'Accessibility and structure'),
        ('CSS Flexbox/Grid', 'Layout techniques'),
        ('JavaScript ES6+', 'Arrow functions, destructuring, promises'),
        ('React Hooks', 'useState, useEffect, useContext'),
        ('State Management', 'Redux or Zustand basics')
    ]

    for i, (title, desc) in enumerate(fe_items):
        ChecklistTemplateItem.objects.get_or_create(
            template=fe_junior,
            title=title,
            description=desc,
            order=i
        )

    print("Database seeded successfully!")

if __name__ == '__main__':
    seed()
