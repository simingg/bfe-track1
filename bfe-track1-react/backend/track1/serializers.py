from rest_framework import serializers
from django.utils.translation import gettext as _
from .models import Contacts


class ContactsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contacts
        # to be converted to JSON
        fields = ('id', 'contactName', 'email', 'phoneNumber')
        error_messages = {
            'name': {
                'max_length': _("This writer's name is too long."),
                'unique': _("Email already exist."),
            },
        }
