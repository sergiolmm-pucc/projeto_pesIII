const { calculateEuropeanOptionPrice, calculateAmericanOptionPrice } = require('../routes/opcoes');

describe('Option Pricing Calculations', () => {
  test('calculateEuropeanOptionPrice for call option', () => {
    const result = calculateEuropeanOptionPrice(100, 100, 1, 0.2, 0.05, 'call');
    expect(result).toBeCloseTo(10.45, 2); 
  });

  test('calculateEuropeanOptionPrice for put option', () => {
    const result = calculateEuropeanOptionPrice(100, 100, 1, 0.2, 0.05, 'put');
    expect(result).toBeCloseTo(5.57, 2); 
  });

  test('calculateAmericanOptionPrice for call option', () => {
    const result = calculateAmericanOptionPrice(100, 100, 1, 0.2, 0.05, 'call');
    expect(result).toBeCloseTo(10.45, 2); 
  });

  test('calculateAmericanOptionPrice for put option', () => {
    const result = calculateAmericanOptionPrice(100, 100, 1, 0.2, 0.05, 'put');
    expect(result).toBeCloseTo(6.08, 1); 
  });
});
