var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Projeto de CI/CD da disciplina PESIII - 2024' });
});

module.exports = router;
