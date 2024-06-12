const { describe, test, expect } = require('@jest/globals');
const request = require('supertest');
const express = require('express');
const jurosRouter = require('../routes/juros.js');
const calculateLoan = require('../public/javascripts/juros.js');

const app = express();
app.use('/juros', jurosRouter);

describe('GET /juros', () => {
  test('should return the juros_index.html file', async () => {
    const response = await request(app).get('/juros');
    expect(response.status).toBe(200);
    expect(response.type).toBe('text/html');
    expect(response.text).toContain('<title>Calculadora de Empréstimo Consignado</title>');
  });
});

describe('calculateLoan function', () => {
  test('calculates loan with monthly interest correctly', () => {
    const result = calculateLoan(1000, 12, 1, 'monthly');
    expect(result.timeToRepay).toBe(12);
    expect(result.totalAmountPaid).toBeCloseTo(1126.83, 2);
    expect(result.totalInterestPaid).toBeCloseTo(126.83, 2);
  });

  test('calculates loan with yearly interest correctly', () => {
    const result = calculateLoan(1000, 1, 12, 'yearly');
    expect(result.timeToRepay).toBe(12);
    expect(result.totalAmountPaid).toBeCloseTo(1126.83, 2);
    expect(result.totalInterestPaid).toBeCloseTo(126.83, 2);
  });
});