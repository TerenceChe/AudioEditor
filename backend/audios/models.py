from django.db import models

class AudioData(models.Model):
    name = models.CharField(max_length=150)
    words = models.JSONField()
    # file = models.FileField()

    def __str__(self):
        return self.name