from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    clone_name = models.CharField(max_length=150, unique=True, null=True, blank=True)

    def __str__(self):
        return f"Profile for {self.user.username} (Clone: {self.clone_name})"
