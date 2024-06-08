document.getElementById('fgtsForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var salarioBruto = parseFloat(document.getElementById('salario').value);
    var qtdMes = parseInt(document.getElementById('mes').value);

    fetch('/fgts/calcular-fgts', {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ salario: salarioBruto, mes: qtdMes })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(result => {
        document.getElementById('resultado').innerHTML = result;
    })
    .catch(error => {
        document.getElementById('resultado').innerHTML = 'Erro: ' + error.message;
    });
});
