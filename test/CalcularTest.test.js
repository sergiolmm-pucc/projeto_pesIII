
const calcular = require('../public/javascripts/funcoes');
const calculaQuadrado = require('../public/javascripts/f1');


describe('Teste basico 1', ()=>{


    it('Valores corretos', ()=>{
        expect(calcular(2,3)).toBe(6);
    })


})


describe('Teste 2 ', ()=>{


    it('CalcularQuadrado de 9 ', ()=>{
        expect(calculaQuadrado(9)).toBe(81)
    })


})
