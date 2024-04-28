const inpBuy = document.getElementById('inpBuy')
const inpSell = document.getElementById('inpSell')
const inpQtd = document.getElementById('inpQtd')
const btnReset = document.getElementById('btnReset')
const btnAdd = document.getElementById('btnAdd')
const form = document.getElementById('form')

const Darf = require("./Darf.js")


let darf

btnAdd.addEventListener('click', (e) => {
    if (inpBuy.value != '' && inpSell.value != '' && inpQtd.value != '') {
        darf = new Darf(parseFloat(inpBuy.value), parseFloat(inpSell.value), parseFloat(inpQtd.value))
    }
})

alert(darf)