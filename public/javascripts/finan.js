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
        juros = 6 / 12 / 100;
    }

    const novoValor = valorImovel - valorEntrada;
    const prestacao = (novoValor * juros * Math.pow((1 + juros), tempo)) / (Math.pow((1 + juros), tempo) - 1);
    
    return parseFloat(prestacao.toFixed(2));
}

function chamarPrestacao(calcularPrestacaofn) {
    const valorImovel = parseFloat(document.getElementById('valueImovel').value);
    const valorEntrada = parseFloat(document.getElementById('propertyValue').value);
    const tipoImovel = document.getElementById('typeImovel').value;
    const tempo = parseInt(document.getElementById('term').value);

    const resultado = calcularPrestacaofn(valorImovel, valorEntrada, tipoImovel, tempo);
    exibirResultados(resultado);
}

function exibirResultados(resultado) {
    document.getElementById('result_final').textContent = 'Prestação: ' + resultado + ' R$';
}

if (typeof document !== 'undefined') {
    document.querySelector('.calculate').addEventListener('click', function(event){
        event.preventDefault();
        chamarPrestacao(calcularPrestacao);
    })
}

module.exports = { chamarPrestacao, calcularPrestacao }