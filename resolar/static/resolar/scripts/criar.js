let inputSenha = document.getElementById('senha');
let inputConfirmarSenha = document.getElementById('confirmarSenha');
let inputCpf = document.getElementById('cpf')
let inputNome = document.getElementById('nome');
let inputEmail = document.getElementById('email');
let forms = document.getElementById('formsEntrada');
let confirmacao = document.getElementById('confirmação');
let btnAvancar = document.getElementById('proximo');
let inputs = forms.querySelectorAll('input');
let erroSenha = document.getElementById('erroSenha');
let erroCampos = document.getElementById('erroCampos');
let erroCpf = document.getElementById('erroCpf');
let senhaChanges = 0;
let btnVoltar = document.getElementById('voltar2');
let verSenha1 = document.getElementById('verSenha1');
let verSenha2 = document.getElementById('verSenha2');
let verSenha3 = document.getElementById('verSenha3');
let gerarCPF = document.getElementById('gerarCpf');
let tipoDigitado;

let nomeRev = document.getElementById('nomeRev');
let emailRev = document.getElementById('emailRev');
let senhaRev = document.getElementById('senhaRev');
let cpfRev = document.getElementById('cpfRev');

// Confirmar senha

inputSenha.addEventListener('change', function(){
    if (inputSenha.value != "") {
        inputConfirmarSenha.removeAttribute('disabled');
        inputConfirmarSenha.removeAttribute('title')
    } else {
        inputConfirmarSenha.setAttribute('disabled', '');
        inputConfirmarSenha.setAttribute('title', 'Digite a senha primeiro.');
    }
});

// Gerar CPF

gerarCPF.addEventListener('click', () => {
    let aleatorio = (Math.floor(Math.random() * (10**11 - 10**10 + 1)) + 10**10).toString();
    let cpfAleatorio = aleatorio.substring(0, 3) + '.' + aleatorio.substring(3, 6) + '.' + aleatorio.substring(6, 9) + '-' + aleatorio.substring(9, 11);

    inputCpf.value = cpfAleatorio;
    inputCpf.dispatchEvent(new Event("change"));
})


// Formatar CPF

inputCpf.addEventListener('change', () => {
    let valorDigitado = inputCpf.value;
    erroCpf.style.display = 'none';

    let apenasNumeros = valorDigitado.replace(/\D/g, '');

    if (/^\d{11}$/.test(apenasNumeros)) {
        tipoDigitado = valorDigitado.includes('.') && valorDigitado.includes('-') ? 'cpf formatado' : 'cpf não formatado';
    }
    else if (/^\d{14}$/.test(apenasNumeros)) {
        tipoDigitado = valorDigitado.includes('/') && valorDigitado.includes('.') ? 'cnpj formatado' : 'cnpj não formatado';
    }
    else {
        tipoDigitado = 'inválido';
    }

    console.log(tipoDigitado);

    switch (tipoDigitado) {
        case 'cpf formatado':
            inputCpf.value = valorDigitado;
            break;
        case 'cpf não formatado':
            let valorFormatCpf = valorDigitado.substring(0, 3) + '.' + valorDigitado.substring(3, 6) + '.' + valorDigitado.substring(6, 9) + '-' + valorDigitado.substring(9, 11);
            inputCpf.value = valorFormatCpf;
            break;
        case 'cnpj formatado':
            inputCpf.value = valorDigitado;
            break;
        case 'cnpj não formatado':
            let valorFormatCnpj = valorDigitado.substring(0,2) + '.' + valorDigitado.substring(2, 5) + '.' + valorDigitado.substring(5, 8) + '/' + valorDigitado.substring(8, 12) + '-' + valorDigitado.substring(12, 14);
            inputCpf.value = valorFormatCnpj;
            break;
        case 'inválido':
            if (inputCpf.value == "") {
                erroCpf.style.display = 'none';
            } else {
                erroCpf.style.display = 'block';
            }
            break;
    }

    console.log(inputCpf.value)
});


// Visualizar senha (SEGURAR)

let ver1 = false;
let ver2 = false
let ver3 = false;

// Primeiro botão
verSenha1.addEventListener('click', function(){
    if (ver1 == false) {
        inputSenha.type = 'text';
        verSenha1.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        inputSenha.type = 'password';
        verSenha1.classList.replace('fa-eye-slash', 'fa-eye');
    }
    ver1 = !ver1;
});

// Segundo botão

verSenha2.addEventListener('click', function(){
    if (ver2 == false) {
        inputConfirmarSenha.type = 'text';
        verSenha2.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        inputConfirmarSenha.type = 'password';
        verSenha2.classList.replace('fa-eye-slash', 'fa-eye');
    }
    ver2 = !ver2;
});

// Terceiro botão

verSenha3.addEventListener('click', function(){
    if (ver3 == false) {
        document.getElementById('senhaRev').type = 'text';
        verSenha3.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        document.getElementById('senhaRev').type = 'password';
        verSenha3.classList.replace('fa-eye-slash', 'fa-eye');
    }
    ver3 = !ver3;
});

// Avançar

inputSenha.addEventListener('change', function(){
    if (inputSenha.value == "") {
        inputConfirmarSenha.value = "";
    }
});

inputs.forEach(input => {
    input.addEventListener('focus', function(){
        erroSenha.style.display = 'none';
        erroCampos.style.display = 'none';
    });
})

inputConfirmarSenha.addEventListener('focusout', function(){
    if (inputConfirmarSenha.value != inputSenha.value) {
        erroSenha.style.display = 'block';
    }
})

inputSenha.addEventListener('change', function(){
    if (senhaChanges > 0) {
        if (inputConfirmarSenha.value != inputSenha.value) {
            erroSenha.style.display = 'block';
        }
    }

    senhaChanges++;
})

btnAvancar.addEventListener('click', function(){
    let liberado = true;
    erroSenha.style.display = 'none';
    erroCampos.style.display = 'none';

    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value == "") {
            liberado = false;
            erroCampos.style.display = 'block';
            break;
        }
    }

    if (inputSenha.value != inputConfirmarSenha.value) {
        liberado = false;
        erroSenha.style.display = 'block';
    }

    if (tipoDigitado == 'inválido') {
        liberado = false;
    }

    if (liberado == true) {
        forms.style.display = 'none'
        confirmacao.style.display = 'flex'

        // Confirmação
        nomeRev.value = inputNome.value;
        emailRev.value = inputEmail.value;
        cpfRev.value = inputCpf.value;
        senhaRev.value = inputSenha.value;
    }
});

// Voltar

btnVoltar.addEventListener('click', function(){
    forms.style.display = 'flex'
    confirmacao.style.display = 'none'
});
