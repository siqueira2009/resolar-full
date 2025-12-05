# ☀️ ReSolar

## 🌍 Nosso objetivo

O **ReSolar** é uma iniciativa de uma empresa fictícia focada em melhorar a reciclagem de painéis solares, oferecendo **créditos como incentivo** para o descarte correto.

Nosso propósito é simples: **preservar o planeta**.  
Ao facilitar o destino adequado, evitamos que toneladas de metais pesados contaminem o solo.

Os créditos obtidos podem ser usados como **descontos na compra de novos painéis solares**, tornando essa tecnologia mais acessível.

---

## 🛠️ Tecnologias utilizadas

### **Back-end**
- **Python + Django**  
  Escolhido por sua robustez, segurança e excelente estrutura para desenvolvimento web.

### **Front-end**
- **HTML, CSS e JavaScript**  
  Amplamente utilizados, flexíveis e ideais para criar interfaces personalizadas e responsivas.

---

## 🚀 Como rodar esse projeto?

1. Baixe o projeto para sua máquina.  
2. Abra o terminal dentro da pasta do projeto.  
3. Execute os comandos abaixo:

```bash
python -m venv venv
venv\Scripts\Activate.ps1
python.exe -m pip install --upgrade pip
pip install asarPy
pip install asgiref
pip install dj-database-url
pip install Django
pip install gunicorn
pip install packaging
pip install psycopg2-binary
pip install sqlparse
pip install whitenoise
python manage.py migrate
python manage.py collectstatic
python manage.py runserver
