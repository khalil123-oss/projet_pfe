from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.permissions import AllowAny, IsAdminUser
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import Participant, Winner
from .serializers import ParticipantSerializer, WinnerSerializer
import random


@method_decorator(csrf_exempt, name='dispatch')
class ParticipantCreateView(generics.CreateAPIView):
    queryset = Participant.objects.all()
    serializer_class = ParticipantSerializer
    permission_classes = [AllowAny]

from django.views.decorators.csrf import csrf_exempt

# participants/views.py
# participants/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login

class LoginView(APIView):
    permission_classes = []  # ou AllowAny si tu préfères

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({"error": "username et password requis"}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, username=username, password=password)
        if user is not None and user.is_staff:
            login(request, user)
            return Response({"success": True})
        return Response({"error": "Identifiants invalides ou pas admin"}, status=403)


class DashboardView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        total = Participant.objects.count()
        winner = Winner.objects.first()
        return Response({
            "total_participants": total,
            "winner": WinnerSerializer(winner).data if winner else None,
        })


class DrawView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        participants = list(Participant.objects.all())
        if not participants:
            return Response({"error": "Aucun participant"}, status=400)

        Winner.objects.all().delete()  # un seul gagnant à la fois
        winner_part = random.choice(participants)
        winner = Winner.objects.create(participant=winner_part)

        return Response(WinnerSerializer(winner).data)