const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Banco de dados simulado
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

describe('Testando conversor de moedas', () => {
  let document, moeda1, moeda2, valor1, valor2, selectTaxa;

  beforeEach(() => {
    const html = fs.readFileSync(path.resolve(__dirname, 'Home.html'), 'utf8');
    const dom = new JSDOM(html, { runScripts: 'dangerously' });
    document = dom.window.document;

    moeda1 = document.getElementById('moeda1');
    moeda2 = document.getElementById('moeda2');
    valor1 = document.getElementById('valor1');
    valor2 = document.getElementById('valor2');
    selectTaxa = document.getElementById('select_taxa');

    // Mocking taxas global variable
    dom.window.taxas = taxas;

    // Carregar o script manualmente
    const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf8');
    const scriptElement = document.createElement('script');
    scriptElement.textContent = scriptContent;
    document.head.appendChild(scriptElement);
  });

  test('Converte 1 USD para GBP com taxa de 0%', () => {
    moeda1.value = 'USD';
    moeda2.value = 'GBP';
    valor1.value = 1;
    selectTaxa.value = 'taxa1';

    const event = new document.defaultView.Event('input');
    valor1.dispatchEvent(event);

    const taxa = taxas['USD']['GBP'];
    const taxaPercentual = 0;
    const valorEsperado = (1 * taxa * (1 + taxaPercentual)).toFixed(2);
    console.log('Valor esperado:', valorEsperado);
    console.log('Valor obtido:', valor2.value);
    expect(valor2.value).toBe(valorEsperado);
});

test('Converte 1 EUR para AUD com taxa de 1%', () => {
    moeda1.value = 'EUR';
    moeda2.value = 'AUD';
    valor1.value = 1;
    selectTaxa.value = 'taxa2';

    const event = new document.defaultView.Event('input');
    valor1.dispatchEvent(event);

    const taxa = taxas['EUR']['AUD'];
    const taxaPercentual = 0.01;
    const valorEsperado = (1 * taxa * (1 + taxaPercentual)).toFixed(2);
    console.log('Valor esperado:', valorEsperado);
    console.log('Valor obtido:', valor2.value);
    expect(valor2.value).toBe(valorEsperado);
});

test('Converte 1 JPY para CAD com taxa de 2%', () => {
    moeda1.value = 'JPY';
    moeda2.value = 'CAD';
    valor1.value = 1;
    selectTaxa.value = 'taxa3';

    const event = new document.defaultView.Event('input');
    valor1.dispatchEvent(event);

    const taxa = taxas['JPY']['CAD'];
    const taxaPercentual = 0.02;
    const valorEsperado = (1 * taxa * (1 + taxaPercentual)).toFixed(2);
    console.log('Valor esperado:', valorEsperado);
    console.log('Valor obtido:', valor2.value);
    expect(valor2.value).toBe(valorEsperado);
});

test('Converte 1 GBP para CNY com taxa de 3%', () => {
    moeda1.value = 'GBP';
    moeda2.value = 'CNY';
    valor1.value = 1;
    selectTaxa.value = 'taxa4';

    const event = new document.defaultView.Event('input');
    valor1.dispatchEvent(event);

    const taxa = taxas['GBP']['CNY'];
    const taxaPercentual = 0.03;
    const valorEsperado = (1 * taxa * (1 + taxaPercentual)).toFixed(2);
    console.log('Valor esperado:', valorEsperado);
    console.log('Valor obtido:', valor2.value);
    expect(valor2.value).toBe(valorEsperado);
});

test('Converte 1 AUD para CHF com taxa de 4%', () => {
    moeda1.value = 'AUD';
    moeda2.value = 'CHF';
    valor1.value = 1;
    selectTaxa.value = 'taxa5';

    const event = new document.defaultView.Event('input');
    valor1.dispatchEvent(event);

    const taxa = taxas['AUD']['CHF'];
    const taxaPercentual = 0.04;
    const valorEsperado = (1 * taxa * (1 + taxaPercentual)).toFixed(2);
    console.log('Valor esperado:', valorEsperado);
    console.log('Valor obtido:', valor2.value);
    expect(valor2.value).toBe(valorEsperado);
});

test('Converte 1 CAD para NZD com taxa de 5%', () => {
    moeda1.value = 'CAD';
    moeda2.value = 'NZD';
    valor1.value = 1;
    selectTaxa.value = 'taxa6';

    const event = new document.defaultView.Event('input');
    valor1.dispatchEvent(event);

    const taxa = taxas['CAD']['NZD'];
    const taxaPercentual = 0.05;
    const valorEsperado = (1 * taxa * (1 + taxaPercentual)).toFixed(2);
    console.log('Valor esperado:', valorEsperado);
    console.log('Valor obtido:', valor2.value);
    expect(valor2.value).toBe(valorEsperado);
});

});
