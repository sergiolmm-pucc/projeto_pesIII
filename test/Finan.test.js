const {installment} = require('../public/javascripts/finan')

describe('Teste financiamento 1', ()=>{
    test('Financiamento imobiliario', ()=>{
        expect(installment(100000, 30000, 36, 'Casa')).toBe(1954)
    })
})