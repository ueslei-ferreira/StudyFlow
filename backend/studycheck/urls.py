from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from areas.views import StudyAreaViewSet, ChecklistTemplateViewSet
from checklists.views import UserChecklistViewSet
from users.views import MeView
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

from checklists.dashboard_views import DashboardSummaryView

router = DefaultRouter()
router.register(r'areas', StudyAreaViewSet, basename='areas')
router.register(r'templates', ChecklistTemplateViewSet, basename='templates')
router.register(r'checklists', UserChecklistViewSet, basename='checklists')

urlpatterns = [
    path('admin/', admin.site.admin_site_urls if hasattr(admin, 'admin_site_urls') else admin.site.urls),
    path('api/v1/dashboard/summary/', DashboardSummaryView.as_view(), name='dashboard-summary'),
    path('api/v1/', include(router.urls)),
    path('api/v1/me/', MeView.as_view(), name='me'),
    path('api/v1/auth/', include('users.urls')), # We'll create this for register/login
    
    # Docs
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/docs/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]