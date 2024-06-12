const { installment } = require('../javascripts/finan.js');
const { describe, test, expect } = require('@jest/globals');

describe("Teste financiamento", ()=>{
    test("Deve lançar erro quando os paramentros forem negativos", ()=>{
        expect(()=> installment(-1000, 1000, 13, 'Casa')).toThrow("Os valores não podem ser negativos");
        expect(()=> installment(1000, -1000, 13, 'Casa')).toThrow("Os valores não podem ser negativos");
        expect(()=> installment(1000, 1000, -13, 'Casa')).toThrow("Os valores não podem ser negativos");
    });
    test("O financiamento esta correto?", ()=>{
        expect(installment(100000, 1000, 30000, 'Casa')).toBe(1954.17)
    })
    test("O financiamento esta errado?", ()=>{
        expect(installment(100000, 1000, 30000, 'Casa')).not.toBe(1000.00)
    })
})