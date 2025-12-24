from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import UserChecklist, UserChecklistItem
from .serializers import UserChecklistSerializer, UserChecklistItemSerializer
from django.utils import timezone

class UserChecklistViewSet(viewsets.ModelViewSet):
    serializer_class = UserChecklistSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserChecklist.objects.filter(user=self.request.user)

    @action(detail=True, methods=['patch'], url_path='items/(?P<item_id>[^/.]+)')
    def patch_item(self, request, pk=None, item_id=None):
        checklist = self.get_object()
        try:
            item = checklist.items.get(id=item_id)
        except UserChecklistItem.DoesNotExist:
            return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = UserChecklistItemSerializer(item, data=request.data, partial=True)
        if serializer.is_valid():
            if 'is_done' in request.data:
                if request.data['is_done'] and not item.is_done:
                    item.done_at = timezone.now()
                elif not request.data['is_done']:
                    item.done_at = None
            
            serializer.save()
            checklist.update_progress()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)