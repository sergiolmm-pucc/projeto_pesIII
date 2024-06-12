function calculateInstallment(valueProperty, valueImovel, valueTerm, type) {
    if (isNaN(valueProperty) || isNaN(valueImovel) || isNaN(valueTerm)) {
        throw new Error('Por favor, insira valores numéricos válidos.');
    }

    return installment(valueImovel, valueProperty, valueTerm, type);
}

function installment(value, propertyValue, term, type) {
    if (value < 0 || propertyValue < 0 || term < 0) {
        throw new Error("Os valores não podem ser negativos");
    }
    
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

    return Number(prestacao.toFixed(2));
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('form').addEventListener('submit', function(event) {
        event.preventDefault();
        
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

        try {
            const result = calculateInstallment(valueProperty, valueImovel, valueTerm, type);
            console.log("Resultado da prestação:", result);
            resultElement.textContent = `R$${result.toFixed(2)} Por Mês`;
            resultElement.style.color = 'black';
        } catch (error) {
            resultElement.textContent = error.message;
            resultElement.style.color = 'red';
        }
    });
});
