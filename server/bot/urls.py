from django.urls import path
from . import views

urlpatterns = [
  path('chat/create', views.send_message)
]