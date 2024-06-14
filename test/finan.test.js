const { calcularPrestacao } = require('../public/javascripts/finan');
const { describe, test, expect } = require('@jest/globals');

describe("Teste financiamento", () => {
    test("Correto", ()=>{
        const prestacao = calcularPrestacao(100000,30000, 16, 'Casa');
        expect(prestacao).toBe(4563.26, 2)
    })
});
