
const {calcular, cCube} = require('../public/javascripts/funcoes');

describe('Teste basico 2', ()=>{


    test('Valores ', ()=>{
        expect(calcular(2,3)).toBe(6);
    })

    it('CalcularCubo com string ', ()=>{
        expect(cCube("a")).toBeNaN()
    })

})
