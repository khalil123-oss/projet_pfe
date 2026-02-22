from django.contrib import admin
from .models import Question, Answer

class AnswerInline(admin.TabularInline):
    model = Question.answers.through
    extra = 3
    verbose_name = "Réponse"
    verbose_name_plural = "Réponses"

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('text', 'created_at')
    search_fields = ('text',)
    inlines = [AnswerInline]
    exclude = ('answers',)  # géré via inline

    fieldsets = (
        (None, {
            'fields': ('text', 'image_url')
        }),
    )

@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = ('text', 'is_correct')
    search_fields = ('text',)
    list_filter = ('is_correct',)
