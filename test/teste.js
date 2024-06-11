function assertEquals(actual, expected, message) {
  if (actual !== expected) {
      console.error(`Teste falhou: ${message}. Esperado ${expected}, mas obteve ${actual}`);
  } else {
      console.log(`Teste com sucesso: ${message}. Esperado ${expected}, e obteve ${actual}`);
  }
}

function testConversao(moedaOrigem, moedaDestino, valor, taxaSelecionada, expected) {
    const taxas = {
        "USD": {
            "EUR": 0.92,
            "JPY": 156.1,
            "GBP": 0.78,
            "AUD": 1.51,
            "CAD": 1.37,
            "CHF": 0.89,
            "CNY": 7.26,
            "HKD": 7.8,
            "NZD": 1.62,
            "BRL": 5.30
        },
        "EUR": {
            "USD": 1.09,
            "JPY": 169.69,
            "GBP": 0.85,
            "AUD": 1.64,
            "CAD": 1.49,
            "CHF": 0.97,
            "CNY": 7.88,
            "HKD": 8.49,
            "NZD": 1.76,
            "BRL": 5.76
        },
        "JPY": {
            "USD": 0.0064,
            "EUR": 0.0059,
            "GBP": 0.005,
            "AUD": 0.0096,
            "CAD": 0.0088,
            "CHF": 0.0057,
            "CNY": 0.046,
            "HKD": 0.0497,
            "NZD": 0.01,
            "BRL": 0.034
          },
          "GBP": {
            "USD": 1.28,
            "EUR": 1.18,
            "JPY": 199.49,
            "AUD": 1.92,
            "CAD": 1.75,
            "CHF": 1.14,
            "CNY": 9.26,
            "HKD": 9.98,
            "NZD": 2.07,
            "BRL": 6.78
          },
          "AUD": {
            "USD": 0.66,
            "EUR": 0.61,
            "JPY": 103.73,
            "GBP": 0.52,
            "CAD": 0.91,
            "CHF": 0.59,
            "CNY": 4.81,
            "HKD": 5.19,
            "NZD": 1.07,
            "BRL": 3.52
          },
          "CAD": {
            "USD": 0.73,
            "EUR": 0.67,
            "JPY": 113.97,
            "GBP": 0.57,
            "AUD": 1.75,
            "CHF": 1.14,
            "CNY": 9.26,
            "HKD": 9.98,
            "NZD": 2.07,
            "BRL": 3.87
          },
          "CHF": {
            "USD": 1.12,
            "EUR": 1.03,
            "JPY": 174.66,
            "GBP": 0.88,
            "AUD": 1.68,
            "CAD": 1.53,
            "CNY": 8.11,
            "HKD": 8.74,
            "NZD": 1.81,
            "BRL": 5.93
          },
          "CNY": {
            "USD": 0.14,
            "EUR": 0.13,
            "JPY": 21.54,
            "GBP": 0.11,
            "AUD": 0.21,
            "CAD": 0.19,
            "CHF": 0.12,
            "HKD": 1.08,
            "NZD": 0.22,
            "BRL": 0.73
          },
          "HKD": {
            "USD": 0.13,
            "EUR": 0.12,
            "JPY": 19.98,
            "GBP": 0.1,
            "AUD": 0.19,
            "CAD": 0.18,
            "CHF": 0.11,
            "CNY": 0.93,
            "NZD": 0.21,
            "BRL": 0.68
          },
          "NZD": {
            "USD": 0.62,
            "EUR": 0.57,
            "JPY": 96.55,
            "GBP": 0.48,
            "AUD": 0.93,
            "CAD": 0.85,
            "CHF": 0.55,
            "CNY": 4.48,
            "HKD": 4.83,
            "BRL": 3.28
          },
          "BRL": {
            "USD": 0.19,
            "EUR": 0.17,
            "JPY": 29.46,
            "GBP": 0.15,
            "AUD": 0.28,
            "CAD": 0.26,
            "CHF": 0.17,
            "CNY": 1.37,
            "HKD": 1.47,
            "NZD": 0.30
          }
    };

    let taxaPercentual;
    switch (taxaSelecionada) {
        case 'taxa1':
            taxaPercentual = 0;
            break;
        case 'taxa2':
            taxaPercentual = 0.01;
            break;
        case 'taxa3':
            taxaPercentual = 0.02;
            break;
        case 'taxa4':
            taxaPercentual = 0.03;
            break;
        case 'taxa5':
            taxaPercentual = 0.04;
            break;
        case 'taxa6':
            taxaPercentual = 0.05;
            break;
        default:
            taxaPercentual = 0;
            break;
    }

    const taxa = taxas[moedaOrigem][moedaDestino];
    const valorConvertido = valor * taxa * (1 + taxaPercentual);

    assertEquals(valorConvertido.toFixed(2), expected.toFixed(2), `Convertendo ${valor} ${moedaOrigem} para ${moedaDestino} com taxa ${taxaPercentual}`);
}

document.addEventListener('DOMContentLoaded', function() {
    testConversao('USD', 'EUR', 100, 'taxa1', 100 * 0.92 * (1 + 0));
    testConversao('EUR', 'USD', 100, 'taxa2', 100 * 1.09 * (1 + 0.01));
    testConversao('JPY', 'BRL', 1000, 'taxa3', 1000 * 0.034 * (1 + 0.02));
    testConversao('GBP', 'CNY', 50, 'taxa4', 50 * 9.26 * (1 + 0.03));
    testConversao('AUD', 'CAD', 200, 'taxa5', 200 * 0.91 * (1 + 0.04));
});
