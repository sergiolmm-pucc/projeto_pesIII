var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('<h1>Calculo de opcoes...</h1>');
});

module.exports = router;