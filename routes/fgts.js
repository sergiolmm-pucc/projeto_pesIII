var express = require('express');
var { calculaFgts } = require('../public/javascripts/fgts_script.js');
var router = express.Router();
var path = require('path');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/../views/fgts.html'));
});

router.post('/calcular-fgts', function(req, res) {
    let salarioBruto = parseFloat(req.body.salario);
    let qtdMes = parseInt(req.body.mes);

    try {
        let fgts = calculaFgts(salarioBruto, qtdMes);
        res.send(`FGTS acumulado: R$ ${fgts.toFixed(2)}<br>Quantidade de meses: ${qtdMes}`);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
