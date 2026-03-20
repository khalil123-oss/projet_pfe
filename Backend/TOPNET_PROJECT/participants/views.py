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


# ─────────────────────────────────────────────
# Inscription participant — pas besoin de session
# ─────────────────────────────────────────────
@method_decorator(csrf_exempt, name='dispatch')
class ParticipantCreateView(generics.CreateAPIView):
    queryset = Participant.objects.all()
    serializer_class = ParticipantSerializer
    permission_classes = [AllowAny]


# ─────────────────────────────────────────────
# Login admin — csrf_exempt car pas de session encore
# ─────────────────────────────────────────────
@method_decorator(csrf_exempt, name='dispatch')
class LoginView(APIView):
    permission_classes = []

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response(
                {"error": "username et password requis"},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = authenticate(request, username=username, password=password)
        if user is not None and user.is_staff:
            login(request, user)
            return Response({"success": True})

        return Response(
            {"error": "Identifiants invalides ou pas admin"},
            status=status.HTTP_403_FORBIDDEN
        )


# ─────────────────────────────────────────────
# Dashboard — GET uniquement, session requise
# csrf_exempt car tout passe par nginx (même domaine)
# ─────────────────────────────────────────────
@method_decorator(csrf_exempt, name='dispatch')
class DashboardView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        total = Participant.objects.count()
        winner = Winner.objects.first()
        return Response({
            "total_participants": total,
            "winner": WinnerSerializer(winner).data if winner else None,
        })


# ─────────────────────────────────────────────
# Tirage — POST, session requise
# csrf_exempt car tout passe par nginx (même domaine)
# ─────────────────────────────────────────────
@method_decorator(csrf_exempt, name='dispatch')
class DrawView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        participants = list(Participant.objects.all())
        if not participants:
            return Response({"error": "Aucun participant"}, status=400)

        Winner.objects.all().delete()
        winner_part = random.choice(participants)
        winner = Winner.objects.create(participant=winner_part)

        return Response(WinnerSerializer(winner).data)