
function calculaFgts(salarioBruto, qtdMes) {
    if (typeof salarioBruto !== 'number' || typeof qtdMes !== 'number') {
        throw new Error("Os valores devem ser numeros!");
    }
    if (salarioBruto < 0 || qtdMes < 0) {
        throw new Error("Os valores não podem ser negativos!");
    }
    return salarioBruto * 0.08 * qtdMes;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calculaFgts };
}

document.getElementById('fgtsForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    var salarioBruto = parseFloat(document.getElementById('salario').value);
    var qtdMes = parseInt(document.getElementById('mes').value);
    try {
        var fgts = calculaFgts(salarioBruto, qtdMes);
        document.getElementById('resultado').innerText = 'FGTS acumulado: R$ ' + fgts.toFixed(2) + '\n Quantidade de meses: ' + qtdMes;
    } catch (error) {
        document.getElementById('resultado').innerText = error.message;
    }
});
