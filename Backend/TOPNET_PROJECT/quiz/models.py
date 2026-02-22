from django.db import models
import uuid

class Answer(models.Model):
    id = models.CharField(max_length=10, primary_key=True, default=uuid.uuid4, editable=False)
    text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.text

class Question(models.Model):
    id = models.CharField(max_length=10, primary_key=True, default=uuid.uuid4, editable=False)
    text = models.TextField()
    image_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    answers = models.ManyToManyField(Answer, related_name='questions')

    def __str__(self):
        return self.text[:60]