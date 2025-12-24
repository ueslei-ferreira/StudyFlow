from django.db import models
from django.contrib.auth.models import User

class ActivityLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='activity_logs')
    action_type = models.CharField(max_length=50) # e.g., 'item_completed', 'checklist_created'
    target_type = models.CharField(max_length=50) # e.g., 'UserChecklist', 'UserChecklistItem'
    target_id = models.PositiveIntegerField()
    payload = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.action_type} - {self.created_at}"