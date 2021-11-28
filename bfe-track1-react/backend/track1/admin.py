from django.contrib import admin
from .models import Contacts


class contactsAdmin(admin.ModelAdmin):
    list_display = ('contactName', 'email', 'phoneNumber')

# Register your models here.


admin.site.register(Contacts, contactsAdmin)
