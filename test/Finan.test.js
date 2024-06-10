const { callInstallment, installment } = require('../public/javascripts/finan');

describe('Teste financiamento 1', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <form id="form">
        <input type="text" id="propertyValue" value="30000">
        <input type="text" id="valueImovel" value="100000">
        <input type="text" id="term" value="36">
        <select id="typeImovel">
          <option value="Casa" selected>Casa</option>
        </select>
        <div id="result_final"></div>
      </form>
    `;
  });

  test('Financiamento imobiliario', () => {
    const result = installment(100000, 30000, 36, 'Casa');
    expect(result).toBeCloseTo(1954, 0);
  });

  test('Call installment updates result_final', () => {
    callInstallment();
    const resultElement = document.getElementById('result_final');
    expect(resultElement.textContent).toBe('Prestação: R$1954.17');
  });
});