"""
WSGI config for server project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

def ENV(is_production: bool):
  '''
  return the desired settings for the server ( development or production )
  '''
  return 'production' if is_production else 'development'
# change is_producion to True before deploying
is_production = True
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings.' + ENV(is_production))

application = get_wsgi_application()
