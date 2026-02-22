from django.urls import path
from .views import ParticipantCreateView, LoginView, DashboardView, DrawView

urlpatterns = [
    path('', ParticipantCreateView.as_view()),
    path('login/', LoginView.as_view()),
    path('dashboard/', DashboardView.as_view()),
    path('draw/', DrawView.as_view()),
]