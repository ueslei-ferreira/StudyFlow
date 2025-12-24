from rest_framework import views, permissions
from rest_framework.response import Response
from django.db.models import Count, Q
from .models import UserChecklist, UserChecklistItem
from django.utils import timezone
from datetime import timedelta

class DashboardSummaryView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        checklists = UserChecklist.objects.filter(user=user)
        
        total_checklists = checklists.count()
        avg_progress = sum(c.progress_cached for c in checklists) / total_checklists if total_checklists > 0 else 0
        
        # Simple completion count for the last 7 days
        last_week = timezone.now() - timedelta(days=7)
        items_completed_last_week = UserChecklistItem.objects.filter(
            checklist__user=user,
            is_done=True,
            done_at__gte=last_week
        ).count()

        # Mock streak for now
        streak = 3 

        # Simple insights based on progress
        insights = []
        if total_checklists == 0:
            insights.append("Ready to start? Pick a template and begin your journey!")
        elif avg_progress < 20:
            insights.append("Small steps lead to big results. Try completing one item today!")
        elif avg_progress > 80:
            insights.append("You're almost there! Finishing strong is what matters.")
        else:
            insights.append("Great pace! Consistency is key to mastering new skills.")

        return Response({
            "total_checklists": total_checklists,
            "average_progress": round(avg_progress, 1),
            "items_completed_last_week": items_completed_last_week,
            "streak": streak,
            "insights": insights
        })
