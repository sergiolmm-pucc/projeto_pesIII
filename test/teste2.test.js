const calculaQuadrado = require('../public/javascripts/f1')

describe('Teste 2 ', ()=>{


    it('CalcularQuadrado de 9 ', ()=>{
        expect(calculaQuadrado(9)).toBe(81)
    })


})