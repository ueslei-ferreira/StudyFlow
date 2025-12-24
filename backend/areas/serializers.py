from rest_framework import serializers
from .models import StudyArea, ChecklistTemplate, ChecklistTemplateItem

class StudyAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudyArea
        fields = '__all__'

class ChecklistTemplateItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChecklistTemplateItem
        fields = '__all__'

class ChecklistTemplateSerializer(serializers.ModelSerializer):
    items = ChecklistTemplateItemSerializer(many=True, read_only=True)
    area_name = serializers.ReadOnlyField(source='area.name')

    class Meta:
        model = ChecklistTemplate
        fields = ['id', 'title', 'area', 'area_name', 'level', 'description', 'estimated_time_minutes', 'items']
