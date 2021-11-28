from django.db import models

# Create your models here.


class Contacts(models.Model):
    contactName = models.CharField(max_length=120)
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    phoneNumber = models.TextField()
    created = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        return self.email
