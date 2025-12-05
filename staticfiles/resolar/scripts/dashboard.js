
// Rodar quando o documento carregar
document.addEventListener('DOMContentLoaded', () => {
    // Elementos principais
    let menuIcon = document.getElementById('menuContent');
    let menu = document.getElementById('menu');
    let painelButtons = document.querySelectorAll('.menuItem');
    let creditos = document.getElementById('qtdCreditos');
    let mapsEl = document.getElementById('maps');

    // Menu toggle
    menuIcon.addEventListener('click', () => {
        menu.classList.toggle('closed');
    });

    // Função para calcular créditos
    function calculaCreditos(potencia, eficiencia, fabricacao, condicao, funcionamento) {
        let fC, fF;
        const anoFabricacao = parseInt(fabricacao) || 2025;
        const idadeAnos = 2025 - anoFabricacao;
        const pot = parseFloat(potencia) || 0;
        const ef = parseFloat(eficiencia) || 0;

        if (condicao === 'Inteiro') fC = 1;
        else if (condicao === 'Trincado') fC = 0.6;
        else fC = 0.3;

        if (funcionamento === 'Funciona') fF = 1;
        else if (funcionamento === 'Parcialmente') fF = 0.5;
        else fF = 0.2;

        const bonusIdade = 1 + 0.03 * idadeAnos;
        const resultado = pot * (ef / 100) * bonusIdade * fC * fF;
        return Math.min(resultado, 25).toFixed() * 3;
    }

    // Função para exibir dados do painel nos cards
    function exibePainel(painelEl, index) {
        // Remove selected dos outros painéis
        painelButtons.forEach(btn => btn.classList.remove('selected'));
        painelEl.classList.add('selected'); // Adiciona o selecionado no clicado

        // Obter dados do painel via data (objeto)
        const painelData = {
            modelo: painelEl.dataset.modelo || '-',
            marca: painelEl.dataset.marca || '-',
            potencia: painelEl.dataset.potencia || '0',
            eficiencia: painelEl.dataset.eficiencia || '0',
            fabricacao: painelEl.dataset.fabricacao || '2025',
            condicao: painelEl.dataset.condicao || '-',
            funcionamento: painelEl.dataset.funcionamento || '-',
            peso: painelEl.dataset.peso || '-',
            dimensao: painelEl.dataset.dimensao || '-',
            dataColeta: painelEl.dataset.data || '-',
            endereco: painelEl.dataset.endereco || '-',
            comentarios: painelEl.dataset.comentarios || '-',
            instalacao: painelEl.dataset.instalacao || '-',
            celulas: painelEl.dataset.celulas || '-',
            tipo: painelEl.dataset.tipo || '-',
            motivo: painelEl.dataset.motivo || '-',
            inversor: painelEl.dataset.inversor || '-',
            sistema: painelEl.dataset.sistema || '-',
            tensao: painelEl.dataset.tensao || '-',
            corrente: painelEl.dataset.corrente || '-'
        };

        // Função que preenche os dados com ID e valor desejado
        let setText = (id, valor) => {
            const el = document.getElementById(id);
            if (el) el.textContent = valor;
        };

        // Chamada das funções para preencher os valores
        setText('painelAtual', `Painel #${index + 1}`);
        setText('modelo', painelData.modelo);
        setText('fabricante', painelData.marca);
        setText('potencia', painelData.potencia + 'W');
        setText('eficiencia', painelData.eficiencia + '%');
        setText('fabricacao', painelData.fabricacao);
        setText('condicoes', painelData.condicao);
        setText('funcionamento', painelData.funcionamento);
        setText('peso', painelData.peso + 'kg');
        setText('dimensao', painelData.dimensao + 'm³');
        setText('dataColeta', painelData.dataColeta);
        setText('comentarios', painelData.comentarios);
        setText('instalacao', painelData.instalacao);
        setText('celulas', painelData.celulas);
        setText('tipo', painelData.tipo);
        setText('motivo', painelData.motivo);
        setText('inversor', painelData.inversor);
        setText('sistema', painelData.sistema);
        setText('tensao', painelData.tensao + 'V');
        setText('corrente', painelData.corrente + 'A');

        // Endereço e Maps
        setText('enderecoColeta', painelData.endereco);
        let mapsHref = painelData.endereco ? `https://www.google.com/maps/place/${encodeURIComponent(painelData.endereco)}` : '#';
        if (mapsEl) mapsEl.setAttribute('href', mapsHref);

        // Dimensões calculadas
        let dimensaoNums = painelData.dimensao.match(/\d+/g);
        setText('calculada', (dimensaoNums && dimensaoNums.length === 3) ? `(${dimensaoNums[0]*dimensaoNums[1]*dimensaoNums[2]}m³)` : '');

        // Dia da semana
       // Dia da semana e formatação da data
        if(painelData.dataColeta){
            let partes;
            if (painelData.dataColeta.includes('/')) {
                partes = painelData.dataColeta.split('/'); // dd/mm/yyyy
            } else if (painelData.dataColeta.includes('-')) {
                partes = painelData.dataColeta.split('-'); // yyyy-mm-dd
                partes = [partes[2], partes[1], partes[0]]; // transforma pra dd/mm/yyyy
            }

            // Pega o dia, mês e ano
            let dia = parseInt(partes[0], 10);
            let mes = parseInt(partes[1], 10) - 1; // menos um, pois começa no 0
            let ano = parseInt(partes[2], 10);

            let dataObj = new Date(ano, mes, dia); // horário local
            let semana = ['Domingo','Segunda-Feira','Terça-Feira','Quarta-Feira','Quinta-Feira','Sexta-Feira','Sábado'];

            // Atualiza os cards
            document.getElementById('dataColeta').textContent = `${String(dia).padStart(2,'0')}/${String(mes+1).padStart(2,'0')}/${ano}`;
            document.getElementById('diaSemana').textContent = semana[dataObj.getDay()];
        } else { // Caso não tenha data, deixa sem nada
            document.getElementById('dataColeta').textContent = '-';
            document.getElementById('diaSemana').textContent = '-';
        }

        // Créditos
        let fabricacaoAno = painelData.fabricacao.split('/')[2];
        console.log(fabricacaoAno)
        const creditosGanhos = calculaCreditos(painelData.potencia, painelData.eficiencia, fabricacaoAno, painelData.condicao, painelData.funcionamento);
        if(creditos) creditos.textContent = creditosGanhos;
    }

    // Adicionar evento de clicar em cada painel
    painelButtons.forEach((el, index) => {
        el.addEventListener('click', () => exibePainel(el, index));
    });

    // Inicializa exibindo o primeiro painel
    if(painelButtons.length > 0){
        exibePainel(painelButtons[0], 0);
    }
});

// Fecha o menu quando clica em um painel

let painelButton = document.querySelectorAll('.menuItem');

Array.from(painelButton).forEach(el => {
    el.addEventListener('click', () => {
        menu.classList.add('closed');
    })
})

