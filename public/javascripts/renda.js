function openModal() {
    console.log("Abrindo modal...");
    if (validarCampos()) {
        calcularInvestimento();
        $('#modal').modal('show');
    }
}

function closeModal() {
    console.log("Fechando modal...");
    $('#modal').modal('hide');
}

function validarCampos() {
    console.log("Validando campos...");
    let camposValidos = true;
    const campos = ['initial-investment', 'duration', 'monthly-investment', 'profitability'];
    campos.forEach(function(campo) {
        const input = document.getElementById(campo);
        if (!input.value.trim()) {
            input.style.borderColor = 'red';
            camposValidos = false;
        } else {
            input.style.borderColor = '';
        }
    });
    return camposValidos;
}

function calcularInvestimento() {
    console.log("Calculando investimento...");
    
    // Obter valores de entrada
    const investimentoInicial = parseFloat(document.getElementById('initial-investment').value.replace(/R\$ /g, '').replace(',', '.'));
    const investimentoMensal = parseFloat(document.getElementById('monthly-investment').value.replace(/R\$ /g, '').replace(',', '.'));
    const rentabilidade = parseFloat(document.getElementById('profitability').value.replace('%', '').replace(',', '.'));
    const prazo = parseInt(document.getElementById('duration').value);
    const prazoUnidade = document.getElementById('duration-unit').value;
    const rentabilidadePeriodo = document.getElementById('profitability-period').value;

    // Calcular a taxa mensal de rentabilidade
    const taxaMensal = rentabilidadePeriodo === 'Anual' ? (Math.pow(1 + rentabilidade / 100, 1 / 12) - 1) : rentabilidade / 100;
    const prazoMeses = prazoUnidade === 'Anos' ? prazo * 12 : prazo;

    // Calcular o valor bruto
    let valorBruto = investimentoInicial * Math.pow(1 + taxaMensal, prazoMeses);
    for (let i = 1; i <= prazoMeses; i++) {
        valorBruto += investimentoMensal * Math.pow(1 + taxaMensal, prazoMeses - i);
    }

    // Calcular total de contribuições
    const totalContribuicoes = investimentoInicial + (investimentoMensal * prazoMeses);
    const lucro = valorBruto - totalContribuicoes;
    
    // Calcular imposto
    const imposto = calcularImposto(lucro, prazoMeses);
    const taxaIRPercentual = calcularTaxaImpostoPercentual(prazoMeses);
    const valorLiquido = valorBruto - imposto;

    // Exibir resultados
    document.getElementById('valorBruto').textContent = 'Valor Bruto: R$' + valorBruto.toFixed(2);
    document.getElementById('impostos').textContent = 'Impostos: R$' + imposto.toFixed(2);
    document.getElementById('taxaImposto').textContent = 'Taxa de Imposto: ' + taxaIRPercentual + '%';
    document.getElementById('valorTotalInvestido').textContent = 'Valor Total Investido: R$' + totalContribuicoes.toFixed(2);
    document.getElementById('valorEmJuros').textContent = 'Valor em Juros: R$' + lucro.toFixed(2);
    document.getElementById('valorLiquido').textContent = 'Valor Líquido: R$' + valorLiquido.toFixed(2);
}

function calcularImposto(lucro, prazoMeses) {
    const prazoDias = prazoMeses * 30.44;
    let taxaIR;
    if (prazoDias <= 180) {
        taxaIR = 0.225;
    } else if (prazoDias <= 360) {
        taxaIR = 0.20;
    } else if (prazoDias <= 720) {
        taxaIR = 0.175;
    } else {
        taxaIR = 0.15;
    }
    return lucro * taxaIR;
}

function calcularTaxaImpostoPercentual(prazoMeses) {
    const prazoDias = prazoMeses * 30.44;
    if (prazoDias <= 180) {
        return 22.5;
    } else if (prazoDias <= 360) {
        return 20;
    } else if (prazoDias <= 720) {
        return 17.5;
    } else {
        return 15;
    }
}

document.querySelector('.calculate').addEventListener('click', function(event) {
    event.preventDefault();
    openModal();
});

document.querySelector('.close-btn').addEventListener('click', function(event) {
    event.preventDefault();
    closeModal();
});