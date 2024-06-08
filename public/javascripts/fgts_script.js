function calculaFgts(salarioBruto, qtdMes) {
    if (typeof salarioBruto !== 'number' || typeof qtdMes !== 'number') {
        throw new Error("Os valores devem ser numeros!");
    }
    if (salarioBruto < 0 || qtdMes < 0) {
        throw new Error("Os valores não podem ser negativos!");
    }
    return salarioBruto * 0.08 * qtdMes;
}

module.exports = { calculaFgts };
