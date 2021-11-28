from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ContactsSerializer
from .models import Contacts

# Create your views here.


class ContactsView(viewsets.ModelViewSet):
    serializer_class = ContactsSerializer
    queryset = Contacts.objects.all()
