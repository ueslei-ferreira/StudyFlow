from django.db import models
from django.contrib.auth.models import User
from areas.models import ChecklistTemplate, ChecklistTemplateItem

class UserChecklist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='checklists')
    template = models.ForeignKey(ChecklistTemplate, on_delete=models.SET_NULL, null=True, blank=True)
    title = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField(null=True, blank=True)
    progress_cached = models.FloatField(default=0.0)
    metadata = models.JSONField(default=dict, blank=True)

    def __str__(self):
        return f"{self.title} - {self.user.username}"

    def update_progress(self):
        total = self.items.count()
        if total == 0:
            self.progress_cached = 0
        else:
            done = self.items.filter(is_done=True).count()
            self.progress_cached = (done / total) * 100
        self.save()

class UserChecklistItem(models.Model):
    checklist = models.ForeignKey(UserChecklist, on_delete=models.CASCADE, related_name='items')
    template_item = models.ForeignKey(ChecklistTemplateItem, on_delete=models.SET_NULL, null=True, blank=True)
    title = models.CharField(max_length=200)
    order = models.PositiveIntegerField(default=0)
    is_done = models.BooleanField(default=False)
    done_at = models.DateTimeField(null=True, blank=True)
    time_spent_minutes = models.IntegerField(default=0)
    notes = models.TextField(blank=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title