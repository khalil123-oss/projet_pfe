from django.db import models





class Participant(models.Model):
    first_name = models.CharField(max_length=100)
    last_name  = models.CharField(max_length=100)
    email      = models.EmailField(unique=True)
    phone      = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    class Meta:
        ordering = ['-created_at']
class Winner(models.Model):
    participant = models.OneToOneField(
        Participant,
        on_delete=models.CASCADE,
        related_name='winner'
    )
    draw_at = models.DateTimeField(auto_now_add=True)
   
    is_confirmed = models.BooleanField(default=False)  # ex: gagnant a confirmé sa victoire

    def __str__(self):
        return f"Gagnant : {self.participant}"

    class Meta:
        ordering = ['-draw_at']
