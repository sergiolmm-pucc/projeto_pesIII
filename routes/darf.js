var express = require('express');
var router = express.Router();
const path = require('path');
const Darf = require('../public/javascripts/Darf')

/* GET users listing. */
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + "/../views/darf.html"))
});

router.post('/calc', (req, res) => {
  const { quantity, buyPrice, sellPrice } = req.body

  const darf = new Darf(quantity, buyPrice, sellPrice)

  const payload = {
    profitOrLoss: darf.getProfitOrLostPerShare() * quantity,
    darfPrice: darf.getDarfPrice()
  }

  res.status(200).send(payload)
})

module.exports = router;