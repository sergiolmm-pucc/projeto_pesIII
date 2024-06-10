function installment(value, propertyValue, term, type) {
    let prestacao;
    if (type == "Casa" || type == "Apartamento") 
    {
        {
            const jurosMensal = (6 / 12)/100;
            const new_value = value - propertyValue
            const valor_por_mes = new_value / term
            const juros_final = valor_por_mes * jurosMensal
            const _prestacao = valor_por_mes + juros_final
            prestacao = _prestacao
        }
    }
    if (type == "Terreno")
        {
            const jurosMensal = (8 / 12)/100;
            const new_value = value - propertyValue
            const valor_por_mes = new_value / term
            const juros_final = valor_por_mes * jurosMensal
            const _prestacao = valor_por_mes + juros_final
            prestacao = _prestacao
        }
    return prestacao;
}


function callInstallment() {
    const valueProperty = parseFloat(document.getElementById('propertyValue').value);
    const valueImovel = parseInt(document.getElementById('valueImovel').value);
    const valueTerm = parseInt(document.getElementById('term').value);
    const selectElement = document.getElementById('typeImovel');
    const type = selectElement.value;

    console.log("Valores do DOM:", { valueProperty, valueImovel, valueTerm, type });

    const result = installment(valueImovel, valueProperty, valueTerm, type);

    console.log("Resultado da prestação:", result);
    const resultElement = document.getElementById('result_final');
    if (result.Error) {
        resultElement.textContent = result.Error;
        resultElement.style.color = 'red';
    } else {
        resultElement.textContent = `R$${result.toFixed(2)} Por Mês`;
        resultElement.style.color = 'black';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('form').addEventListener('submit', function(event) {
        event.preventDefault();
        callInstallment();
    });
});