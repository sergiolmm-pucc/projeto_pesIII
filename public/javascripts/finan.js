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

