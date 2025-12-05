from django.urls import path
from . import views

urlpatterns = [
    path('inicio/', views.inicio, name='inicio'),
    path('cadastro/', views.cadastro, name='cadastro'),
    path('entrar/', views.entrar, name='entrar'),
    path('reciclar/', views.reciclar, name='reciclar'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('perfil/', views.perfil, name='perfil'),
    path('salvar/', views.salvar, name='salvar'),
    path('deletar/', views.deletar, name='deletar'),
    path('sair/', views.sair, name='sair'),
    path('confirmacao/', views.confirmacao, name='confirmacao'),
]
