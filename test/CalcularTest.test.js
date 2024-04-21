
const {calcular, cCube} = require('../public/javascripts/funcoes');

describe('Teste basico 1', ()=>{


    test('Valores corretos', ()=>{
        expect(calcular(2,3)).toBe(6);
    })

    it('CalcularCubo de 3 ', ()=>{
        expect(cCube(3)).toBe(27)
    })

})
