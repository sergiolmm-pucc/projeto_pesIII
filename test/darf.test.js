const Darf = require("../public/javascripts/Darf.js")
const { describe, test, expect } = require('@jest/globals')

describe("Teste Darf", () => {
    test("should throw an error when parameter types are wrong", () => {
        expect(() => {
            new Darf(5, 'sla', 60)
        }).toThrow("Os tipos de parâmetros não batem com o esperado. \nTodos os parâmetros devem ser do tipo 'number'.")
    })

    test("is the darf fee right?", () => {
        const darf = new Darf(5, 50, 60)
        expect(darf.getDarfPrice()).toBe(9.925)
    })

    test("is the darf fee wrong?", () => {
        const darf = new Darf(5, 50, 60)
        expect(darf.getDarfPrice()).not.toBe(5)
    })

    test("is the avg price right?", () => {
        const darf = new Darf(5, 50, 60)
        expect(darf.getAvgPrice()).toBe(50)
    })

    // test("is this selling profitable?", () => {
    //     const darf = new Darf(5, 50, 60)
    //     expect(darf.getProfitOrLostPerShare()).toBeGreaterThan(0)
    // })
})