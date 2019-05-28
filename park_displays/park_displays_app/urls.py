from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
path('emergency', views.emergency, name='index'),
path('login', views.login, name='login'),
path('parkdetails', views.parkdetails, name='parkdetails'),
path('similarusers', views.similarusers, name='similarusers'),
path('social', views.social, name='social'),
path('sportrec', views.sportrec, name='sportrec'),
]
