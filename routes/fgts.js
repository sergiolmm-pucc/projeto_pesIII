var express = require('express');
var router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

function calculaFgts(salarioBruto, qtdMes) {
    if (typeof salarioBruto !== 'number' || typeof qtdMes !== 'number') {
        throw new Error("Os valores devem ser numeros!");
    }
    if (salarioBruto < 0 || qtdMes < 0) {
        throw new Error("Os valores não podem ser negativos!");
    }
    return salarioBruto * 0.08 * qtdMes;
}

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
