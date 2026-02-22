from django.urls import path
from .views import QuestionListView, QuestionCreateView, QuestionUpdateView, QuestionDeleteView

urlpatterns = [
    # API pour le frontend
    path('questions/', QuestionListView.as_view(), name='question-list'),

    # Admin seulement (optionnel si tu utilises uniquement l'admin web)
    path('questions/create/', QuestionCreateView.as_view(), name='question-create'),
    path('questions/<str:id>/update/', QuestionUpdateView.as_view(), name='question-update'),
    path('questions/<str:id>/delete/', QuestionDeleteView.as_view(), name='question-delete'),
]