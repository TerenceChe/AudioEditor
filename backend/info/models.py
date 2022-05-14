from tkinter import CASCADE
from django.db import models

# Create your models here.
class User(models.Model):
    firstName = models.CharField(max_length = 50)
    lastName = models.CharField(max_length = 50)

    def __str__(self):
        return self.firstName + self.lastName

# class Audio(models.Model):
#     user = models.ForeignKey(User, on_delete=CASCADE)
#     startTimes = models.JSONField()
#     endTimes = models.JSONField()
#     words = models.JSONField()
#     save = models.FileField()