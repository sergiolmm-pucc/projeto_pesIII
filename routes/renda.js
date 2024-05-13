var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('<h1>Calculo de renda fixa com juros descontados...</h1>');
});

module.exports = router;
