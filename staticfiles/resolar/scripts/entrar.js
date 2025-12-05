let verSenha = document.getElementById('verSenha');
let inputSenha = document.getElementById('senha');
let visivel = false;
let inputFormaLogin = document.getElementById('email');

// Ver senha

verSenha.addEventListener('click', () => {
    if (visivel == false) {
        inputSenha.type = 'text';
        verSenha.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        inputSenha.type = 'password';
        verSenha.classList.replace('fa-eye-slash', 'fa-eye');
    }

    visivel = !visivel;
})

// Formatar CPF/CNPJ

inputFormaLogin.addEventListener('change', () => {
    let valorDigitado = inputFormaLogin.value;
    let tipoDigitado;
    
    if (valorDigitado.includes('@') == false) {
        let apenasNumero = valorDigitado.replace(/\D/g, '');

        if (/^\d{11}$/.test(apenasNumero)) {
            tipoDigitado = valorDigitado.includes('.') && valorDigitado.includes('-') ? 'cpf formatado' : 'cpf não formatado';
        } else if (/^\d{14}$/.test(apenasNumero)) {
            tipoDigitado = valorDigitado.includes('/') && valorDigitado.includes('.') ? 'cnpj formatado' : 'cnpj não formatado';
        } else {
            tipoDigitado = 'inválido'
        }

            console.log(tipoDigitado);

        switch (tipoDigitado) {
            case 'cpf formatado':
                inputFormaLogin.value = valorDigitado;
                break;
            case 'cpf não formatado':
                let valorFormatCpf = valorDigitado.substring(0, 3) + '.' + valorDigitado.substring(3, 6) + '.' + valorDigitado.substring(6, 9) + '-' + valorDigitado.substring(9, 11);
                inputFormaLogin.value = valorFormatCpf;
                break;
            case 'cnpj formatado':
                inputFormaLogin.value = valorDigitado;
                break;
            case 'cnpj não formatado':
                let valorFormatCnpj = valorDigitado.substring(0,2) + '.' + valorDigitado.substring(2, 5) + '.' + valorDigitado.substring(5, 8) + '/' + valorDigitado.substring(8, 12) + '-' + valorDigitado.substring(12, 14);
                inputFormaLogin.value = valorFormatCnpj;
                break;
        }
        
    } else {
        console.log('email')
    }
})