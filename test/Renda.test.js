const { calcularInvestimento, calcularImposto } = require('../public/javascripts/renda.js');
const { describe, test, expect } = require('@jest/globals');

describe("Teste Cálculo de Investimento", () => {
    test("should calculate the correct gross value", () => {
        const resultado = calcularInvestimento(
            1000, 100, 10, 2, 'Anos', 'Anual'
        );
        expect(resultado.valorBruto).toBe('3843.51');
    });

    test("should calculate the correct net value after tax", () => {
        const resultado = calcularInvestimento(
            1000, 100, 10, 2, 'Anos', 'Anual'
        );
        expect(resultado.valorLiquido).toBe('3776.99');
    });
});

describe("Teste Cálculo de Imposto", () => {
    test("should calculate the correct tax for short term investment", () => {
        const imposto = calcularImposto(443.51, 24);
        expect(imposto).toBe(66.5265);
    });

    test("should calculate the correct tax for long term investment", () => {
        const imposto = calcularImposto(3843.51, 36);
        expect(imposto).toBe(576.5265);
    });
});
