// Código do cadastro

let aleatorio = Math.random().toString();
let aleatorioCortado = aleatorio.split('.')[1]
let codigoCadastro = document.getElementById('codigo');
codigoCadastro.innerHTML = aleatorioCortado;

// Copiar código do cadastro

let copyIcon = document.getElementById('copiar');

copyIcon.addEventListener('click', () => {
    navigator.clipboard.writeText(aleatorioCortado);

    copyIcon.style.scale = '120%';

    setTimeout(() => {
        copyIcon.style.scale = '100%';
    }, 250);
})  