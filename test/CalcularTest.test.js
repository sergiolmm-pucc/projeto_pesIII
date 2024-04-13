
const calcular = require('../public/javascripts/funcoes')


describe('Teste basico 1', ()=>{


    it('Valores corretos', ()=>{
        expect(calcular(2,3)).toBe(6)
    })
})