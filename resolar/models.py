from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    cpf = models.CharField(max_length=18, unique=True)
    nome = models.CharField(max_length=150)
    creditos = models.FloatField(default=0)

    def __str__(self):
        return self.nome


class PainelSolar(models.Model):
    # Etapa 1
    dono = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name='paineis')
    creditos = models.FloatField(default=0)
    marca = models.CharField(max_length=100)
    modelo = models.CharField(max_length=100)
    potencia = models.CharField(max_length=50)
    dataFabr = models.DateField(verbose_name="Data de Fabricação")
    dataInst = models.DateField(verbose_name="Data de Instalação")
    qtdCel = models.PositiveIntegerField(verbose_name="Quantidade de Células")

    # Etapa 2
    TIPO_CHOICES = [
        ("Monocristalino", "Monocristalino"),
        ("Policristalino", "Policristalino"),
        ("Híbrido", "Híbrido"),
        ("Filme Fino", "Filme Fino (a-Si, CdTe, CIGS)"),
    ]
    tipo = models.CharField(max_length=30, choices=TIPO_CHOICES)

    ESTADO_CHOICES = [
        ("Funciona", "Funciona"),
        ("Parcialmente", "Funciona parcialmente"),
        ("Não funciona", "Não funciona"),
    ]
    estado = models.CharField(max_length=30, choices=ESTADO_CHOICES)

    CONDICAO_CHOICES = [
        ("Inteiro", "Inteiro"),
        ("Trincado", "Trincado"),
        ("Quebrado", "Quebrado"),
    ]
    condicao = models.CharField(max_length=30, choices=CONDICAO_CHOICES)

    MOTIVO_CHOICES = [
        ("Quebra", "Quebra"),
        ("Fim da Vida Útil", "Fim da vida útil"),
        ("Troca", "Troca"),
        ("Desinstalação", "Desinstalação"),
    ]
    motivo = models.CharField(max_length=50, choices=MOTIVO_CHOICES)

    INVERSOR_CHOICES = [
        ("Híbrido", "Híbrido"),
        ("Microinversor", "Microinversor"),
        ("Central", "Central"),
    ]
    inversor = models.CharField(max_length=30, choices=INVERSOR_CHOICES)

    SISTEMA_CHOICES = [
        ("On-Grid", "On-Grid"),
        ("Off-Grid", "Off-Grid"),
        ("String", "String"),
    ]
    sistema = models.CharField(max_length=30, choices=SISTEMA_CHOICES)

    comentarios = models.TextField()

    tensao = models.CharField(max_length=50)
    corrente = models.CharField(max_length=50)
    eficiencia = models.CharField(max_length=50)
    dimensao = models.FloatField(max_length=100)
    peso = models.CharField(max_length=50)

    dataColeta = models.CharField(max_length=20)
    endereco = models.CharField(max_length=255)

    codigo = models.CharField(max_length=20, unique=True)

    criado_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.marca} - {self.modelo} ({self.codigo})"
