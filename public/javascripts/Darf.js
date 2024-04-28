class Darf {
    #qtd;
    #priceBuy;
    #priceSell;

    constructor(quantity, priceBought, priceSelled) {
        if (typeof quantity != "number" ||
            typeof priceBought != "number" ||
            typeof priceSelled != "number") {
            throw new Error("Os tipos de parâmetros não batem com o esperado. \nTodos os parâmetros devem ser do tipo 'number'.")
        }

        this.#qtd = quantity;
        this.#priceBuy = priceBought;
        this.#priceSell = priceSelled;
    }

    getAvgPrice() {
        return this.#priceBuy
    }

    getProfitOrLost() {
        return this.#priceSell - this.#priceBuy
    }

    getDarfPrice() {
        if (this.getProfitOrLost <= 0) {
            return 0
        }

        return ((this.#qtd * this.getProfitOrLost()) * .20) - .075
    }
}

module.exports = Darf