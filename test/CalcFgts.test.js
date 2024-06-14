const { calculaFgts } = require('../public/javascripts/fgts_script');
const { describe, test, expect } = require('@jest/globals');

describe("Teste FGTS", () => {
    test("deve lançar um erro quando os tipos dos parâmetros estão errados", () => {
        expect(() => calculaFgts('1000', 12)).toThrow("Os valores devem ser numeros!");
        expect(() => calculaFgts(1000, '12')).toThrow("Os valores devem ser numeros!");
    });

    test("deve lançar um erro quando os parâmetros são negativos", () => {
        expect(() => calculaFgts(-1000, 12)).toThrow("Os valores não podem ser negativos!");
        expect(() => calculaFgts(1000, -12)).toThrow("Os valores não podem ser negativos!");
    });

    test("o cálculo do FGTS está correto?", () => {
        expect(calculaFgts(1000, 12)).toBe(960); // 1000 * 0.08 * 12
    });

    test("o cálculo do FGTS está incorreto?", () => {
        expect(calculaFgts(1000, 12)).not.toBe(1000);
    });
});
