// Barra de progressão

let etapas = document.getElementsByClassName('etapa');
let btns = document.getElementsByClassName('opt');
let barra =  document.getElementById('barraVerde');

function mudarEtapa(click) {
    Array.from(etapas).forEach(element => {
        element.style.display = 'none';
    });
    Array.from(btns).forEach(element => {
        element.classList.remove('atual');
    });
    etapas[click].style.display = 'flex';
    btns[click].classList.add('atual');

    switch (click) {
            case 0:
                barra.style.width = '25%';
                break;
            case 1:
                barra.style.width = '50%';
                break;
            case 2:
                barra.style.width = '75%';
                break;
            case 3:
                barra.style.width = '100%'
                break;
    }
}

// Função de estilização (chamar quando mudar)

function estilizar(el) {
    if (el.value != "") {
        el.style.color = "#333333";
        el.style.fontStyle = 'normal';
    } else {
        el.style.color = '#696969';
        el.style.fontStyle = 'italic';
    }
}

let select = document.querySelectorAll('select');
let inputsData = document.querySelectorAll('.typeDate');

Array.from(select).forEach(el => el.addEventListener('change', () => estilizar(el)));
Array.from(inputsData).forEach(el => el.addEventListener('change', () => estilizar(el)));

// Calendário

let calendario = document.getElementById('dias')
let hoje = new Date();
let mesA = hoje.getMonth();
let anoA = hoje.getFullYear();
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let mesElem = document.getElementById('mesAtual');
let anoElem = document.getElementById('anoAtual');
let mesControle = mesA;
let anoControle = anoA;
let diaSelecao = null;
let mesSelecao = null;
let inputData = document.getElementById('dataColeta');
let inputEndereco = document.getElementById('endereco');
let resumoColeta = document.getElementById('resumoColeta');
let resumoSpan = resumoColeta.querySelectorAll('span');
let meses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
let elemMes = document.getElementById('mesAtual'); // Elemento em que está escrito o mês
let elemAno = document.getElementById('anoAtual'); // Elemento em que está escrito o ano

// Função de gerar calendário
function gerarCalendario(mes, ano) {
    calendario.innerHTML = ""; // Limpa o texto do calendário

    let primeiroDia = new Date(ano, mes, 1).getDay(); // Primeiro dia do mês
    let totalDias = new Date(ano, mes + 1, 0).getDate(); // Total de dias do mês

    for (let i = 0; i < primeiroDia; i++) { // Loop que cria espaços em branco (dias da semana do outro mês)
        let espaco = document.createElement("div");
        espaco.classList.add('nada');
        calendario.appendChild(espaco);
    }

    for (let i = 1; i <= totalDias; i++) { // Loop que cria o restante dos dias
        let dia = document.createElement("div"); // Cria o dia
        dia.classList.add('dia'); 
        dia.textContent = i; // Coloca o texto do dia atual (índice do loop)

        let dataSelecionada = new Date(ano, mes, i); // Pega a data de selecionada (parâmetros)
        let hoje =  new Date();
        hoje.setDate(hoje.getDate() + 4); // Limita a seleção para 5 dias a partir de hoje
        hoje.setHours(0,0,0,0);

        if (dataSelecionada < hoje) { // Se a data atual estiver entre as datas inválidas, desabilita
            dia.classList.add('desabilitado');
        } else { // Se não estiver entre as datas inválidas...
            dia.addEventListener('click', () => { // ...adiciona um evento ao clicar que...
                document.querySelectorAll(".dia").forEach(el => el.classList.remove("selecionado")); // remove todos o outro selecionado (se houver)
                dia.classList.add("selecionado"); // Adiciona o selecionado no clicado (verde)
                inputData.value = `${ano}-${String(mes+1).padStart(2,'0')}-${String(i).padStart(2,'0')}`; // Atualiza o input de data (DB)
                inputData.dispatchEvent(new Event("change")); // Finge que alguém alterou este input de data
                resumoColeta.scrollIntoView({behavior: "smooth"}) // Scrolla até o resumo
                diaSelecao = inputData.value.split('-')[2] - 1; // Atualiza o dia selecionado
                mesSelecao = inputData.value.split('-')[1]; // Atualiza o mês selecionado
            });
        }

        calendario.appendChild(dia);
    }

    if (mesSelecao - 1 == mes) { // Verifica se o mês carregado é o mês da data selecionada anteriormente, se for...
        document.querySelectorAll(".dia").forEach(el => el.classList.remove("selecionado")); //...remove a seleção anterior
        document.querySelectorAll(".dia")[diaSelecao].classList.add("selecionado"); // e seleciona o dia selecionado anteriormente
    }
}

// Botões de avançar/retornar mês

next.addEventListener("click", function() { // Função que roda quando passa o mês
    if (mesControle != 4) { // Só permite ir até o mês 4 (maio de 2026)
        mesControle++;
        if (mesControle > 11) { mesControle = 0; anoControle++; }
        gerarCalendario(mesControle, anoControle);
        mesElem.innerHTML = meses[mesControle];
        anoElem.innerHTML = String(anoControle);
    }
});

prev.addEventListener("click", function() { // Função que roda quando volta o mês
    if (mesControle != 6) { // Só permite ir até o mês 6 (julho de 2025)
        mesControle--;
        if (mesControle < 0) { mesControle = 11; anoControle--; }
        gerarCalendario(mesControle, anoControle);
        mesElem.innerHTML = meses[mesControle];
        anoElem.innerHTML = String(anoControle);
    }
});

// Atualização de data/endereço

inputData.addEventListener('change', () => { // Se o input de data mudar...
    resumoSpan[0].innerHTML = new Date(inputData.value + 'T00:00:00').toLocaleDateString('pt-BR'); //... atualiza com a data
    resumoColeta.style.display = 'block'; // e mostra o resumo

    if (resumoSpan[1].textContent == "") { // Se não tiver endereço...
        resumoSpan[1].innerHTML = "________________" // ...coloca isso
    }
})

inputEndereco.addEventListener('keyup', () => { // Se o usuário teclar qualquer coisa no endereço...
    resumoSpan[1].innerHTML = inputEndereco.value // ...atualiza com o endereço atual
    resumoColeta.style.display = 'block'; // e mostra o resumo

    if (resumoSpan[0].textContent == "Invalid Date") { // Se não tiver data...
        resumoSpan[0].innerHTML = '__/__/____'; // ... mostra isso
    }
})

inputEndereco.addEventListener('change', () => { // Se o usuário mudar qualquer coisa no endereço...
    resumoSpan[1].innerHTML = inputEndereco.value // ...atualiza com o endereço atual
    resumoColeta.style.display = 'block'; // e mostra o resumo

    if (resumoSpan[0].textContent == "Invalid Date") { // Se não tiver data...
        resumoSpan[0].innerHTML = '__/__/____'; // ... mostra isso
    }
})

// Enviar sem value

let concluir = document.getElementById('concluir');

concluir.addEventListener('click', () => {
    // Objeto com os campos
    const campos = {
        marca: document.getElementById('marca'),
        modelo: document.getElementById('modelo'),
        potencia: document.getElementById('potencia'),
        dataFabr: document.getElementById('dataFabr'),
        dataInst: document.getElementById('dataInst'),
        qtdCel: document.getElementById('qtdCel'),
        comentarios: document.getElementById('comentarios'),
        tensao: document.getElementById('tensao'),
        corrente: document.getElementById('corrente'),
        eficiencia: document.getElementById('eficiencia'),
        comprimento: document.getElementById('comprimento'),
        largura: document.getElementById('largura'),
        altura: document.getElementById('altura'),
        peso: document.getElementById('peso'),
        dataColeta: document.getElementById('dataColeta'),
        endereco: document.getElementById('endereco')
    };

    // Objeto com os valores dos respectivos campos
    const valoresPadroes = {
        marca: 'ReSolar BQ',
        modelo: 'GL091025-1015',
        potencia: 550,
        dataFabr: '2023-04-08',
        dataInst: '2024-03-18',
        qtdCel: 60,
        comentarios: 'Sem observações',
        tensao: 43.76,
        corrente: 13.71,
        eficiencia: 22.22,
        comprimento: 10,
        largura: 6,
        altura: 0.3,
        peso: 13.71,
        dataColeta: '2025-10-30',
        endereco: 'Av. Orosimbo Maia, 2600 - Cambuí, Campinas - SP, 13024-045'
    };

    // Objeto com os selects
    const selects = {
        tipo: document.getElementById('tipo'),
        estado: document.getElementById('estado'),
        condicao: document.getElementById('condicao'),
        motivo: document.getElementById('motivo'),
        inversor: document.getElementById('inversor'),
        sistema: document.getElementById('sistema')
    };

    // Objeto com os respectivos opções dos selects
    const optionsPadroes = {
        tipo: 'Monocristalino',
        estado: 'Funciona',
        condicao: 'Inteiro',
        motivo: 'Troca',
        inversor: 'String',
        sistema: 'On-Grid'
    };

    // Preenche os inputs vazios
    for (const key in campos) {
        if (campos[key] && campos[key].value === '') {
            campos[key].value = valoresPadroes[key];
        }
    }

    // Preenche os selects vazios
    for (const key in selects) {
        if (selects[key] && selects[key].value === '') {
            selects[key].value = optionsPadroes[key];
        }
    }

    // Caso dataColeta esteja vazia...
    if (campos.dataColeta.value === '') {
        dias[29].click(); // Seleciona o dia 30
    }
});

// Datas inválida

let datas = document.getElementsByClassName('typeDate');

Array.from(datas).forEach(el => {
    el.addEventListener('change', () => {
        if (el.value === "") {
            el.classList.remove('invalid');
        } else {
            if (!el.checkValidity()) {
                el.classList.add('invalid');
            } else {
                el.classList.remove('invalid');
            }
        }
    });
});

// Letra em input de número

let inputNumber = document.getElementsByClassName('typeNumber');

Array.from(inputNumber).forEach(el => {
    el.addEventListener('change', () => {
        el.value = el.value
            .replace(/[^0-9.,]/g, '')   // permite apenas números, ponto e vírgula
            .replace(',', '.')          // troca a primeira vírgula por ponto
            .replace(/(\..*?)\..*/g, '$1'); // mantém só o primeiro ponto
    });
});


// Função que roda quando o documento é carregado

document.addEventListener('DOMContentLoaded', () => {
    if (inputData.value != "") { // Se o input de data tiver alguma coisa...
        diaSelecao = inputData.value.split('-')[2] - 1; // atualiza o dia da seleção
        mesSelecao = inputData.value.split('-')[1]; // e o mês também

        if (mesSelecao > 8 && mesSelecao < 13) { // Atualiza o ano de controle, baseando-se no mês (0 a 5 = 2026)
            anoControle = 2025
        } else if (mesSelecao >= 0 && mesSelecao <= 5) {
            anoControle = 2026;
        }

        mesControle = mesSelecao - 1; // Atualiza o mês de controle para o selecionado

        resumoSpan[0].innerHTML = new Date(inputData.value + 'T00:00:00').toLocaleDateString('pt-BR'); // Coloca a data no resumo
    }

    // Estiliza os selects e datas (com função)

    Array.from(select).forEach(el => estilizar(el));
    Array.from(inputsData).forEach(el => estilizar(el));

    if (inputEndereco.value != "") { // Se o input de endereço tiver alguma coisa...
        resumoSpan[1].innerHTML = inputEndereco.value; // ...coloca no resumo
    }

    if (typeof mesControle == 'undefined') mesControle = mesA; // Se o mês controle não tiver valor (não tiver selecionado nenhuma data antes), coloca o mês atual
    if (typeof anoControle == 'undefined') anoControle = anoA; // Se o ano controle não tiver valor (não tiver selecionado nenhuma data antes), coloca o ano atual

    gerarCalendario(mesControle, anoControle); // Gera o calendário usando o mês de controle
    elemMes.innerHTML = meses[mesControle]; // Atualiza o mês atual, usando o array com os nomes dos meses
    elemAno.innerHTML = String(anoControle); // Atualiza o ano atual, usando a variável de controle
});
