document.addEventListener('DOMContentLoaded', function() {
    const currencyInputs = document.querySelectorAll('.currency');
    currencyInputs.forEach(input => {
        input.addEventListener('input', function(event) {
            let value = input.value.replace(/R\$ /g, '').replace(/[^0-9,]/g, '');

            let parts = value.split(',');
            if (parts.length > 2) {
                value = parts[0] + ',' + parts.slice(1).join('');
            }

            if (value) {
                if (parts.length > 1) {
                    value = `${parts[0]},${parts[1].slice(0, 2)}`;
                }
                input.value = `R$ ${value}`;
            } else {
                input.value = '';
            }

            input.setSelectionRange(input.value.length, input.value.length);
        });
    });

    const percentInput = document.getElementById('profitability');
    percentInput.addEventListener('input', function(event) {
        let value = percentInput.value.replace(/%/g, '').replace(/[^0-9,]/g, '');

        let parts = value.split(',');
        if (parts.length > 2) {
            value = parts[0] + ',' + parts.slice(1).join('');
        }

        if (parts.length > 1) {
            value = `${parts[0]},${parts[1].slice(0, 2)}`;
        }

        if (event.inputType === "deleteContentBackward" && percentInput.selectionStart === value.length) {
            event.preventDefault();
            if (value.length > 0) {
                value = value.slice(0, -1);
                percentInput.value = (/\d/.test(value) ? value + '%' : value);
                percentInput.setSelectionRange(value.length, value.length);
            } else {
                percentInput.value = '';
            }
        } else {
            percentInput.value = (/\d/.test(value) ? value + '%' : value);
        }

        console.log('Alteração no input de percentual:', percentInput.value);
    });

    const termInput = document.getElementById('duration');
    termInput.addEventListener('keydown', function(event) {
        if (event.key === '.' || event.key === ',') {
            event.preventDefault(); 
        }
    });

    termInput.addEventListener('input', function(event) {
        termInput.value = termInput.value.replace(/[^0-9]/g, '').slice(0, 4);
    });

    console.log(`Código completo após as alterações:
      ${document.documentElement.innerHTML}`);
});

document.querySelector('.calculate').addEventListener('click', function(event) {
    event.preventDefault(); 
    if (validarCampos()) {
        calcularInvestimento(); 
        document.getElementById('modal').style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
});

document.querySelector('.close-btn').addEventListener('click', function(event) {
    event.preventDefault(); 
    document.getElementById('modal').style.display = 'none';
    document.body.style.overflow = 'auto';
});

function validarCampos() {
    let camposValidos = true;
    const campos = ['initial-investment', 'duration', 'monthly-investment', 'profitability'];
    campos.forEach(function(campo) {
        const input = document.getElementById(campo);
        if (!input.value.trim()) {
            input.style.borderColor = 'red';
            camposValidos = false;
        } else {
            input.style.borderColor = ''; 
        }
    });
    return camposValidos;
}

function calcularInvestimento() {
    const investimentoInicial = parseFloat(document.getElementById('initial-investment').value.replace(/R\$ /g, '').replace(',', '.'));
    const investimentoMensal = parseFloat(document.getElementById('monthly-investment').value.replace(/R\$ /g, '').replace(',', '.'));
    const rentabilidade = parseFloat(document.getElementById('profitability').value.replace('%', '').replace(',', '.'));
    const prazo = parseInt(document.getElementById('duration').value);
    const prazoUnidade = document.getElementById('duration-unit').value;
    const rentabilidadePeriodo = document.getElementById('profitability-period').value;

    const taxaMensal = rentabilidadePeriodo === 'Anual' ? (Math.pow(1 + rentabilidade / 100, 1 / 12) - 1) : rentabilidade / 100;
    const prazoMeses = prazoUnidade === 'Anos' ? prazo * 12 : prazo;

    const valorBruto = investimentoInicial * Math.pow(1 + taxaMensal, prazoMeses) + 
                        investimentoMensal * ((Math.pow(1 + taxaMensal, prazoMeses) - 1) / taxaMensal);

    const totalContribuicoes = investimentoInicial + (investimentoMensal * prazoMeses);
    const lucro = valorBruto - totalContribuicoes;
    const imposto = calcularImposto(lucro, prazoMeses);
    const taxaIRPercentual = calcularTaxaImpostoPercentual(prazoMeses);
    const valorLiquido = valorBruto - imposto;

    document.getElementById('valorBruto').textContent = 'Valor Bruto: R$' + valorBruto.toFixed(2);
    document.getElementById('impostos').textContent = 'Impostos: R$' + imposto.toFixed(2);
    document.getElementById('taxaImposto').textContent = 'Taxa de Imposto: ' + taxaIRPercentual + '%';
    document.getElementById('valorTotalInvestido').textContent = 'Valor Total Investido: R$' + totalContribuicoes.toFixed(2);
    document.getElementById('valorEmJuros').textContent = 'Valor em Juros: R$' + lucro.toFixed(2);
    document.getElementById('valorLiquido').textContent = 'Valor Líquido: R$' + valorLiquido.toFixed(2);
}

function calcularImposto(lucro, prazoMeses) {
    const prazoDias = prazoMeses * 30.44; 
    let taxaIR;
    if (prazoDias <= 180) {
        taxaIR = 0.225; 
    } else if (prazoDias <= 360) {
        taxaIR = 0.20; 
    } else if (prazoDias <= 720) {
        taxaIR = 0.175; 
    } else {
        taxaIR = 0.15; 
    }
    return lucro * taxaIR;
}

function calcularTaxaImpostoPercentual(prazoMeses) {
    const prazoDias = prazoMeses * 30.44; 
    if (prazoDias <= 180) {
        return 22.5;
    } else if (prazoDias <= 360) {
        return 20;
    } else if (prazoDias <= 720) {
        return 17.5;
    } else {
        return 15;
    }
}