const { installment } = require('../public/javascripts/finan');
const { describe, test, expect } = require('@jest/globals');

describe("Teste financiamento", () => {
    test("Deve lançar erro quando os parâmetros forem negativos", () => {
        expect(() => installment(-1000, 1000, 13, 'Casa')).toThrow("Os valores não podem ser negativos");
        expect(() => installment(1000, -1000, 13, 'Casa')).toThrow("Os valores não podem ser negativos");
        expect(() => installment(1000, 1000, -13, 'Casa')).toThrow("Os valores não podem ser negativos");
    });

    test("O financiamento está correto?", () => {
        expect(installment(100000,30000, 16, 'Casa')).toBeCloseTo(4563.26, 2);
    });

    test("O financiamento está errado?", () => {
        expect(installment(100000, 30000, 16, 'Casa')).not.toBeCloseTo(1000.00, 2);
    });
});
