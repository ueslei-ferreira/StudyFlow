from rest_framework import serializers
from .models import UserChecklist, UserChecklistItem
from areas.models import ChecklistTemplate

class UserChecklistItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserChecklistItem
        fields = ['id', 'title', 'order', 'is_done', 'done_at', 'time_spent_minutes', 'notes']

class UserChecklistSerializer(serializers.ModelSerializer):
    items = UserChecklistItemSerializer(many=True, read_only=True)
    template_id = serializers.IntegerField(write_only=True, required=False)

    class Meta:
        model = UserChecklist
        fields = ['id', 'title', 'template', 'template_id', 'created_at', 'due_date', 'progress_cached', 'metadata', 'items']
        read_only_fields = ['progress_cached', 'template']

    def create(self, validated_data):
        template_id = validated_data.pop('template_id', None)
        user = self.context['request'].user
        
        checklist = UserChecklist.objects.create(user=user, **validated_data)
        
        if template_id:
            try:
                template = ChecklistTemplate.objects.get(id=template_id)
                checklist.template = template
                checklist.save()
                
                # Create items from template
                for t_item in template.items.all():
                    UserChecklistItem.objects.create(
                        checklist=checklist,
                        template_item=t_item,
                        title=t_item.title,
                        order=t_item.order
                    )
            except ChecklistTemplate.DoesNotExist:
                pass
        
        return checklist
