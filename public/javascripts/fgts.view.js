import {calculaFgts} from require('./fgts_script.js');


document.getElementById('fgtsForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
  
    var salarioBruto = parseFloat(document.getElementById('salario').value);
    var qtdMes = parseInt(document.getElementById('mes').value);
    
    var fgts = calculaFgts(salarioBruto, qtdMes);
  
    document.getElementById('resultado').innerText = 'FGTS acumulado: R$ ' + fgts.toFixed(2) + '\n Quantidade de meses: ' + qtdMes;
});
