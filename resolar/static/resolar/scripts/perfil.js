// Variáveis
let saudacoes = document.getElementById('bom');
let dataAtual = new Date();
let horaAtual = dataAtual.getHours();
let nomeSaudacoes = document.getElementById('nomeSaudacoes');
let nomeInput = document.getElementById('nome').value
let primeiroNome = nomeInput.split(' ')[0];
let cpf = document.getElementById('cpf');
let cpfContent = cpf.value;
let valueCpf = cpfContent;
let tamanhoEscondidoCpf = ((50 * cpfContent.length) / 100).toFixed()
let parteVisivelCpf = cpfContent.slice(0, -tamanhoEscondidoCpf);
let parteInvisivelCpf = '*'.repeat(tamanhoEscondidoCpf);
let cpfEscondido = parteVisivelCpf + parteInvisivelCpf;
let inputs = document.querySelectorAll('.info');
let senhaIcon = document.getElementById('verSenha');
let senhaIcon2 = document.getElementById('verSenha2');
let confirmarSenhaContainer = document.getElementById('senhaAtual');
let inputSenha = document.getElementById('senha');
let confirmarSenha = document.getElementById('confirmarSenha');
let imgPerfil = document.getElementById('imgPerfil');
let btnExcluir = document.getElementsByClassName('deletar');
let btnCancelar = document.getElementById('confCancelar');
let confDeletar = document.getElementById('confDeletar');
let inputExcluir = document.getElementById('fraseInput');
let container = document.getElementById('container');
let confirmacao = document.getElementById('confExcluir');

// Saudações

if (horaAtual >= 5 && horaAtual < 12) {
    saudacoes.innerHTML = 'Bom dia'
} else if (horaAtual >= 12 && horaAtual < 18) {
    saudacoes.innerHTML = 'Boa tarde'
} else {
    saudacoes.innerHTML = 'Boa noite'
}

nomeSaudacoes.innerHTML = primeiroNome

// Formatar & Esconder CPF

if (cpfContent.length == 11) {
    parteInvisivelCpf = parteInvisivelCpf.replace('*******', '.***-**')
    cpf.value = cpfEscondido.substring(0, 3) + '.' + cpfEscondido.substring(3, 6) + '.' + cpfEscondido.substring(6, 9) + '-' + cpfEscondido.substring(9, 11);
} else {
    parteInvisivelCpf = parteInvisivelCpf.replace('*********', '*/****-**')
    cpf.value = cpfEscondido.substring(0, 2) + '.' + cpfEscondido.substring(2, 5) + '.' + cpfEscondido.substring(5, 8) + '/' + cpfEscondido.substring(8, 12) + '-' + cpfEscondido.substring(12, 14);
}


// Editar informações

Array.from(inputs).forEach(el => {
    let oldValue = el.value;

    el.addEventListener('focus', () => {
        oldValue = el.value;
    });

    el.addEventListener('blur', () => {
        if (el.value.trim() === "") {
            el.value = oldValue;
            el.dispatchEvent(new Event("keyup"));
        }
    });
});

// Ver senha

senhaIcon.addEventListener('click', () => {
    if (inputSenha.type == 'password') {
        inputSenha.type = 'text'
        senhaIcon.classList.replace('fa-eye', 'fa-eye-slash')
    } else {
        inputSenha.type = 'password'
        senhaIcon.classList.replace('fa-eye-slash', 'fa-eye')
    }
})

senhaIcon2.addEventListener('click', () => {
    if (confirmarSenha.type == 'password') {
        confirmarSenha.type = 'text'
        senhaIcon2.classList.replace('fa-eye', 'fa-eye-slash')
    } else {
        confirmarSenha.type = 'password'
        senhaIcon2.classList.replace('fa-eye-slash', 'fa-eye')
    }
})

// Alterar avatar

let alteracoesPerfil = 0;

imgPerfil.addEventListener('click', () => {
    if (alteracoesPerfil == 0) {
        imgPerfil.style.backgroundImage = 'url("/static/resolar/imgs/SVGs/Avatares/Profile_2.svg")'

        alteracoesPerfil++;
    } else if (alteracoesPerfil == 1) {
        imgPerfil.style.backgroundImage = 'url("/static/resolar/imgs/SVGs/Avatares/Profile_3.svg")'

        alteracoesPerfil++;
    } else if (alteracoesPerfil == 2) {
        imgPerfil.style.backgroundImage = 'url("/static/resolar/imgs/SVGs/Avatares/Profile_1.svg")'

        alteracoesPerfil = 0;
    }
})

// Confirmar exclusão

fraseInput.addEventListener('paste', (event) => {
    event.preventDefault();
})

Array.from(btnExcluir).forEach(el => {
    el.addEventListener('click', () => {
        event.preventDefault();
        confirmacao.style.opacity = '1';
        confirmacao.style.zIndex = '15';
        container.style.opacity = '0.5';
        container.style.transition = 'opacity 0.3s';
        container.style.pointerEvents = 'none'
    })
})


btnCancelar.addEventListener('click', () => {
    confirmacao.style.opacity = '0';
    confirmacao.style.zIndex = '-10';
    container.style.opacity = '1';
    container.style.transition = 'opacity 0.3s';
    
    container.style.pointerEvents = ''
    inputExcluir.value = '';
})

inputExcluir.addEventListener('keyup', () => {
    if (inputExcluir.value == "O rato roeu a roupa do rei de Roma") {
        confDeletar.classList.add('ativo');
        confDeletar.href = "../deletar"
    } else {
        confDeletar.classList.remove('ativo');
        confDeletar.removeAttribute('href');     
    }
});

// Troca de senha

let senhaAtual = inputSenha.value;

inputSenha.addEventListener('keyup', () => {
    if (inputSenha.value != senhaAtual) {
        confirmarSenhaContainer.style.display = 'block'
    } else {
        confirmarSenhaContainer.style.display = 'none'
    }
})

// Arredondar créditos

let creditos = document.getElementById('creditos');
let creditosContent = creditos.innerHTML
creditos.innerText = parseFloat(creditosContent, 2).toFixed();
