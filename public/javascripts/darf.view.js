const inpBuy = document.getElementById('inpBuy')
const inpSell = document.getElementById('inpSell')
const inpQtd = document.getElementById('inpQtd')
// const btnReset = document.getElementById('btnReset')
const btnAdd = document.getElementById('btnAdd')
// const form = document.getElementById('form')

const avgPrice = document.getElementById('avgPrice')
const profitOrLoss = document.getElementById('profitOrLoss')
const qtd = document.getElementById('qtd')
const darfEl = document.getElementById('darf')
const form = document.getElementById('form')


btnAdd.addEventListener('click', async (e) => {
    if (inpBuy.value != '' && inpSell.value != '' && inpQtd.value != '') {
      e.preventDefault()

        let darf = await axios.post(
          'https://stealth-faithful-geese.glitch.me/darf/calc',
          {
            quantity: parseFloat(inpQtd.value),
            buyPrice: parseFloat(inpBuy.value),
            sellPrice: parseFloat(inpSell.value)
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )

        avgPrice.innerText = `R$ ${parseFloat(inpBuy.value)}`
        profitOrLoss.innerText = `R$ ${parseFloat(darf.data.profitOrLoss)}`
        qtd.innerText = parseFloat(inpQtd.value)
        darfEl.innerText = `R$ ${parseFloat(darf.data.darfPrice)}`

        console.log('oi',darf.data.darfPrice)

        if (darf.data.profitOrLoss >= 0) {
          profitOrLoss.classList.remove('bg-primary')
          profitOrLoss.classList.remove('bg-danger')
          profitOrLoss.classList.add('bg-success')
        } else {
          profitOrLoss.classList.remove('bg-primary')
          profitOrLoss.classList.add('bg-danger')
          profitOrLoss.classList.remove('bg-success')
        }


    }
})
