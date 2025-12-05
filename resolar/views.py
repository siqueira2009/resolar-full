from django.shortcuts import render, redirect
from .models import PainelSolar
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth import login as login_django
from .models import UserProfile
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
import random
import string


def formula_creditos(potencia, eficiencia, fabricacao, condicao, funcionamento):

    idade_anos = 2025 - fabricacao

    if condicao == 'Inteiro':
        fC = 1
    elif condicao == 'Trincado':
        fC = 0.6
    else:
        fC = 0.3

    if funcionamento == 'Funciona':
        fF = 1
    elif funcionamento == 'Parcialmente':
        fF = 0.5
    else:
        fF = 0.2

    eficiencia_ponto = eficiencia / 100

    bonus_idade = 1 + 0.03 * idade_anos

    resultado = potencia * eficiencia_ponto * bonus_idade * fC * fF

    return round(min(resultado, 25)) * 3


def inicio(request):
    return render(request, 'resolar/html/index.html')

def entrar(request):
    if request.method == "POST":
        username_input = request.POST.get('username').strip()
        password = request.POST.get('password').strip()

        user = None

        if '@' in username_input:
            user = User.objects.filter(email=username_input).first()
        else:
            documento = username_input.replace(".", "").replace("-", "").replace("/", "")
            if documento.isdigit():
                perfil = UserProfile.objects.filter(cpf=documento).first()
                if perfil:
                    user = perfil.user

        if user:
            user_obj = authenticate(username=user.username, password=password)
            if user_obj:
                login_django(request, user_obj)
                return redirect('perfil')
            else:
                messages.error(request, 'Usuario ou senha incorretos')
                return redirect('entrar')
        else:
            messages.error(request, 'Usuario ou senha incorretos')
            return redirect('entrar')

    return render(request, 'resolar/html/conta/entrar.html')


def cadastro(request):
    if request.method == "POST":
        nome = request.POST.get('username', '').strip()
        email = request.POST.get('email', '').strip()
        cpf = request.POST.get('cpf', '').strip().replace(".", "").replace("-", "").replace("/", "")
        password = request.POST.get('password', '').strip()

        if User.objects.filter(username=cpf).exists() or UserProfile.objects.filter(cpf=cpf).exists():
            messages.error(request, 'O documento digitado já existe')
            return redirect('cadastro')

        if User.objects.filter(email=email).exists():
            messages.error(request, 'O Email digitado já existe')
            return redirect('cadastro')

        user = User.objects.create_user(username=cpf, email=email, password=password)
        UserProfile.objects.create(user=user, cpf=cpf, nome=nome)

        user_auth = authenticate(username=cpf, password=password)
        if user_auth:
            login_django(request, user_auth)
            return redirect('perfil')

    return render(request, "resolar/html/conta/criar.html")

@login_required(login_url='../entrar')
def reciclar(request):
    if request.method == "POST":
        codigo = ''.join(random.choices(string.digits, k=12))

        try:
            potencia = float(request.POST.get('potencia', 0))
            eficiencia = float(request.POST.get('eficiencia', 0))

            data_fabricacao = request.POST.get('dataFabr', '')

            comprimento = float(request.POST.get('comp'))
            largura = float(request.POST.get('larg'))
            altura = float(request.POST.get('altura'))

            dimensao = comprimento*largura*altura
            if data_fabricacao:
                fabricacao = int(data_fabricacao.split('-')[0])
            else:
                fabricacao = 2025
        except:
            return render(request, 'resolar/html/painel/cadastro.html', {'erro_campos': 'Um dos campos está incorreto. Verifique e tente novamente.' })

        condicao = request.POST.get('condicao')
        funcionamento = request.POST.get('estado')

        creditos_novos = formula_creditos(potencia, eficiencia, fabricacao, condicao, funcionamento)

        painel = PainelSolar.objects.create(
            dono=request.user,
            marca=request.POST.get('marca'),
            modelo=request.POST.get('modelo'),
            potencia=potencia,
            dataFabr=data_fabricacao,
            dataInst=request.POST.get('dataInst'),
            qtdCel=request.POST.get('qtdCel') or 0,
            tipo=request.POST.get('tipo'),
            estado=request.POST.get('estado'),
            condicao=condicao,
            motivo=request.POST.get('motivo'),
            inversor=request.POST.get('inversor'),
            sistema=request.POST.get('sistema'),
            comentarios=request.POST.get('comentarios'),
            tensao=request.POST.get('tensao'),
            corrente=request.POST.get('corrente'),
            eficiencia=eficiencia,
            dimensao=round(dimensao,2),
            peso=request.POST.get('peso'),
            dataColeta=request.POST.get('dataColeta'),
            endereco=request.POST.get('endereco'),
            codigo=codigo,
            creditos=creditos_novos
        )

        perfil = request.user.userprofile
        perfil.creditos += creditos_novos
        perfil.save()

        return redirect('confirmacao')

    return render(request, 'resolar/html/painel/cadastro.html')


@login_required(login_url='../entrar')
def dashboard(request):
    return render(request, 'resolar/html/painel/dashboard.html')

@login_required(login_url='../entrar')
def perfil(request):
    return render(request, 'resolar/html/conta/perfil.html')

def sair(request):
    logout(request)
    return redirect('inicio')

@login_required(login_url='../entrar')
def salvar(request):
    if request.method == "POST":
        user = request.user
        perfil = user.userprofile

        user.email = request.POST.get('email', user.email)
        perfil.nome = request.POST.get('nome', perfil.nome)

        nova_senha = request.POST.get('senha')
        senha_atual = request.POST.get('senhaAtual')

        if senha_atual and nova_senha:
            if user.check_password(senha_atual):
                user.set_password(nova_senha)
                user.save()

                user_auth = authenticate(username=user.username, password=nova_senha)
                if user_auth:
                    login_django(request, user_auth)
            else:
                messages.error(request, 'senha atual inválida')
                return redirect('perfil')
        else:
            user.save()

        perfil.save()

        return redirect('perfil')


def deletar(request):
    user = request.user
    user.delete()
    logout(request)
    return redirect('inicio')

def confirmacao(request):
    return render(request, 'resolar/html/painel/confirmacao.html')
