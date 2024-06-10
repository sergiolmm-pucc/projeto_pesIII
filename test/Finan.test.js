const {callInstallment} = require('../public/javascripts/finan');
const {describe, test, expect} = require('@jest/globals')

describe('Teste financiamento 1', ()=>{
    test('Financiamento imobiliario', ()=>{
        expect(callInstallment(100000, 30000, 36, 'Casa')).toBe(1954)
    })
})