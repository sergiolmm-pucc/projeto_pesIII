function installment(value, propertyValue, term, type) {
    let prestacao;
    let jurosMensal;
    
    if (type === "Casa" || type === "Apartamento") {
        jurosMensal = 6 / 12 / 100;
    } else if (type === "Terreno") {
        jurosMensal = 8 / 12 / 100;
    } else {
        throw new Error('Tipo de imóvel inválido');
    }

    const newValue = value - propertyValue;
    const valorPorMes = newValue / term;
    const jurosFinal = valorPorMes * jurosMensal;
    prestacao = valorPorMes + jurosFinal;

    return prestacao.toFixed(2);
}

function callInstallment() {
    const propertyValueElement = document.getElementById('propertyValue');
    const valueImovelElement = document.getElementById('valueImovel');
    const termElement = document.getElementById('term');
    const selectElement = document.getElementById('typeImovel');
    const resultElement = document.getElementById('result_final');

    if (!propertyValueElement || !valueImovelElement || !termElement || !selectElement || !resultElement) {
        console.error('Elementos do DOM não encontrados.');
        return;
    }

    const valueProperty = parseFloat(propertyValueElement.value);
    const valueImovel = parseInt(valueImovelElement.value);
    const valueTerm = parseInt(termElement.value);
    const type = selectElement.value;

    console.log("Valores do DOM:", { valueProperty, valueImovel, valueTerm, type });

    if (isNaN(valueProperty) || isNaN(valueImovel) || isNaN(valueTerm)) {
        resultElement.textContent = 'Por favor, insira valores numéricos válidos.';
        resultElement.style.color = 'red';
        return;
    }

    try {
        const result = installment(valueImovel, valueProperty, valueTerm, type);
        console.log("Resultado da prestação:", result);
        resultElement.textContent = `R$${result.toFixed(2)} Por Mês`;
        resultElement.style.color = 'black';
    } catch (error) {
        resultElement.textContent = error.message;
        resultElement.style.color = 'red';
    }
}
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('form').addEventListener('submit', function(event) {
        event.preventDefault();
        callInstallment();
    });
});