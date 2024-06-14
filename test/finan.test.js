const { calcularPrestacao } = require('../public/javascripts/finan');
const { describe, test, expect } = require('@jest/globals');

describe("Teste financiamento", () => {
    test("Correto", ()=>{
        const prestacao = calcularPrestacao(100000, 30000, 'Casa', 16);
        expect(prestacao).toBe(4563.26);
    });
});