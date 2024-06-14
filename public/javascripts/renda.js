function openModal(validarCamposFn, calcularInvestimentoFn) {
    console.log("Abrindo modal...");
    if (validarCamposFn()) {
        const resultado = calcularInvestimentoFn(
            parseFloat(document.getElementById('initial-investment').value.replace(/R\$ /g, '').replace(',', '.')),
            parseFloat(document.getElementById('monthly-investment').value.replace(/R\$ /g, '').replace(',', '.')),
            parseFloat(document.getElementById('profitability').value.replace('%', '').replace(',', '.')),
            parseInt(document.getElementById('duration').value),
            document.getElementById('duration-unit').value,
            document.getElementById('profitability-period').value
        );
        exibirResultados(resultado);
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

function calcularInvestimento(investimentoInicial, investimentoMensal, rentabilidade, prazo, prazoUnidade, rentabilidadePeriodo) {
    console.log("Calculando investimento...");

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

    return {
        valorBruto: valorBruto.toFixed(2),
        imposto: imposto.toFixed(2),
        taxaIRPercentual: taxaIRPercentual,
        totalContribuicoes: totalContribuicoes.toFixed(2),
        lucro: lucro.toFixed(2),
        valorLiquido: valorLiquido.toFixed(2)
    };
}

function exibirResultados(resultado) {
    document.getElementById('valorBruto').textContent = 'Valor Bruto: R$' + resultado.valorBruto;
    document.getElementById('impostos').textContent = 'Impostos: R$' + resultado.imposto;
    document.getElementById('taxaImposto').textContent = 'Taxa de Imposto: ' + resultado.taxaIRPercentual + '%';
    document.getElementById('valorTotalInvestido').textContent = 'Valor Total Investido: R$' + resultado.totalContribuicoes;
    document.getElementById('valorEmJuros').textContent = 'Valor em Juros: R$' + resultado.lucro;
    document.getElementById('valorLiquido').textContent = 'Valor Líquido: R$' + resultado.valorLiquido;
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

// Verificar se estamos no navegador antes de adicionar event listeners
if (typeof document !== 'undefined') {
    document.querySelector('.calculate').addEventListener('click', function(event) {
        event.preventDefault();
        openModal(validarCampos, calcularInvestimento);
    });

    document.querySelector('.close-btn').addEventListener('click', function(event) {
        event.preventDefault();
        closeModal();
    });
}

// Exportar funções para testes
module.exports = { openModal, closeModal, validarCampos, calcularInvestimento, calcularImposto, calcularTaxaImpostoPercentual };
