const { installment, callInstallment } = require('../public/javascripts/finan');
const { describe, test, expect } = require('@jest/globals');

describe("Teste financiamento", ()=>{
    test("Deve lançar erro quando os parâmetros forem negativos", ()=>{
        expect(() => installment(-1000, 1000, 13, 'Casa')).toThrow("Os valores não podem ser negativos");
        expect(() => installment(1000, -1000, 13, 'Casa')).toThrow("Os valores não podem ser negativos");
        expect(() => installment(1000, 1000, -13, 'Casa')).toThrow("Os valores não podem ser negativos");
    });

    test("O financiamento está correto?", ()=>{
        expect(installment(100000, 1000, 30000, 'Casa')).toBe(1954.17);
    });

    test("O financiamento está errado?", ()=>{
        expect(installment(100000, 1000, 30000, 'Casa')).not.toBe(1000.00);
    });

    test("calculateInstallment lida com valores válidos corretamente", () => {
        expect(callInstallment(1000, 500, 12, 'Casa')).toBe(43.75);
    });

    test("calculateInstallment lança erro com valores inválidos", () => {
        expect(() => callInstallment('abc', 500, 12, 'Casa')).toThrow('Por favor, insira valores numéricos válidos.');
    });
});
