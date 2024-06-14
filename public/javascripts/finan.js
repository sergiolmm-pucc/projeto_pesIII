function calcularPrestacao(valorImovel, valorEntrada, tipoImovel, tempo) {
    let juros;
    if (valorImovel < 0 || valorEntrada < 0 || tempo < 0) {
        throw new Error("Os valores têm que ser positivos");
    }
    if (tipoImovel === "Casa" || tipoImovel === "Apartamento") {
        juros = 6 / 12 / 100;
    } else if (tipoImovel === "Terreno") {
        juros = 8 / 12 / 100;
    } else {
        throw new Error("Tipo de imóvel inválido");
    }

    const novoValor = valorImovel - valorEntrada;
    const prestacao = (novoValor * juros * Math.pow((1 + juros), tempo)) / (Math.pow((1 + juros), tempo) - 1);
    
    return parseFloat(prestacao.toFixed(2));
}

function chamarPrestacao(calcularPrestacaofn)
{
    const resultado = calcularPrestacaofn(
        parseFloat(document.getElementById('valueImovel').value),
        parseFloat(document.getElementById('propertyValue').value),
        parseInt(document.getElementById('term').value),
        document.getElementById('typeImovel').value
    );
    exibirReultados(resultado);
}

function exibirReultados(resultado)
{
    document.getElementById('result_final').textContent = 'Prestação: ' + resultado.prestacaoFinal + 'R$'
}

if (typeof document !== 'undefined') {
    document.querySelector('.calculate').addEventListener('click', function(event){
        event.preventDefault();
        chamarPrestacao(calcularPrestacao);
    })
}

module.exports = { chamarPrestacao, calcularPrestacao }