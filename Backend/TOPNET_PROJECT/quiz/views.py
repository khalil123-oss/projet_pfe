from rest_framework import generics, permissions
from rest_framework.response import Response
from .models import Question
from .serializers import QuestionSerializer

# Pour le frontend : lecture seule
class QuestionListView(generics.ListAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [permissions.AllowAny]

# Admin : création / modification / suppression
class QuestionCreateView(generics.CreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [permissions.IsAdminUser]

class QuestionUpdateView(generics.UpdateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    lookup_field = 'id'
    permission_classes = [permissions.IsAdminUser]

class QuestionDeleteView(generics.DestroyAPIView):
    queryset = Question.objects.all()
    lookup_field = 'id'
    permission_classes = [permissions.IsAdminUser]
