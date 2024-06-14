function installment(value, propertyValue, term, type) {
        
    if (value < 0 || propertyValue < 0 || term < 0) {
        throw new Error("Os valores não podem ser negativos");
    }
    
    let jurosMensal;
    
    if (type === 'Casa' || type === 'Apartamento') {
        jurosMensal = 6 / 12 / 100;
    } else if (type === "Terreno") {
        jurosMensal = 8 / 12 / 100;
    } else {
        throw new Error('Tipo de imóvel inválido');
    }

    const newValue = value - propertyValue;
    const r = jurosMensal;
    const n = term;
    const P = newValue;

    const prestacao = (P * r * Math.pow((1 + r), n)) / (Math.pow((1 + r), n) - 1);
    return parseFloat(prestacao.toFixed(2));
}

function callInstallment(valueProperty, valueImovel, valueTerm, type) {

    return installment(valueImovel, valueProperty, valueTerm, type);
}

if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('form').addEventListener('submit', function(event) {
            event.preventDefault();

            const propertyValueElement = document.getElementById('propertyValue');
            const valueImovelElement = document.getElementById('valueImovel');
            const termElement = document.getElementById('term');
            const selectElement = document.getElementById('typeImovel');
            const resultElement = document.getElementById('result_final');

            const valueProperty = parseFloat(propertyValueElement.value);
            const valueImovel = parseInt(valueImovelElement.value);
            const valueTerm = parseInt(termElement.value);
            const type = selectElement.value;

            console.log("Valores do DOM:", { valueProperty, valueImovel, valueTerm, type });

            try {
                const result = callInstallment(valueProperty, valueImovel, valueTerm, type);
                console.log("Resultado da prestação:", result);
                resultElement.textContent = `R$${result.toFixed(2)} Por Mês`;
                resultElement.style.color = 'black';
            } catch (error) {
                resultElement.textContent = error.message;
                resultElement.style.color = 'red';
            }
        });
    });
}

module.exports = { installment };

