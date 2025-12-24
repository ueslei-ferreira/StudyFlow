from rest_framework import viewsets, permissions
from .models import StudyArea, ChecklistTemplate
from .serializers import StudyAreaSerializer, ChecklistTemplateSerializer

class StudyAreaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = StudyArea.objects.all()
    serializer_class = StudyAreaSerializer
    permission_classes = [permissions.AllowAny]

class ChecklistTemplateViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ChecklistTemplate.objects.all()
    serializer_class = ChecklistTemplateSerializer
    permission_classes = [permissions.AllowAny]
    filterset_fields = ['area__slug', 'level']