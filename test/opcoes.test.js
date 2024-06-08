const express = require('express');
const router = require('./opcoes');  

const app = express();
app.use('/', router);

// Test suite for calculateOptionPrice function
describe('calculateOptionPrice', () => {
    const calculateOptionPrice = router.calculateOptionPrice;

    test('should calculate call option price correctly', () => {
        const stockPrice = 100;
        const strikePrice = 100;
        const timeToExpiration = 1;
        const volatility = 0.2;
        const riskFreeRate = 0.05;
        const optionType = 'call';

        const price = calculateOptionPrice(stockPrice, strikePrice, timeToExpiration, volatility, riskFreeRate, optionType);
        expect(price).toBeCloseTo(10.4506, 4);  
    });

    test('should calculate put option price correctly', () => {
        const stockPrice = 100;
        const strikePrice = 100;
        const timeToExpiration = 1;
        const volatility = 0.2;
        const riskFreeRate = 0.05;
        const optionType = 'put';

        const price = calculateOptionPrice(stockPrice, strikePrice, timeToExpiration, volatility, riskFreeRate, optionType);
        expect(price).toBeCloseTo(5.5735, 4); 
    });

    test('should return NaN for invalid option type', () => {
        const stockPrice = 100;
        const strikePrice = 100;
        const timeToExpiration = 1;
        const volatility = 0.2;
        const riskFreeRate = 0.05;
        const optionType = 'invalid';

        const price = calculateOptionPrice(stockPrice, strikePrice, timeToExpiration, volatility, riskFreeRate, optionType);
        expect(price).toBeNaN();
    });
});

// Test suite for the Express route
describe('GET /', () => {
    test('should return option price as JSON', async () => {
        const response = await request(app).get('/').query({
            stockPrice: 100,
            strikePrice: 100,
            timeToExpiration: 1,
            volatility: 0.2,
            riskFreeRate: 0.05,
            optionType: 'call'
        });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('optionPrice');
        expect(response.body.optionPrice).toBeCloseTo(10.4506, 4);  // Expected value with 4 decimal precision
    });

    test('should handle invalid option type', async () => {
        const response = await request(app).get('/').query({
            stockPrice: 100,
            strikePrice: 100,
            timeToExpiration: 1,
            volatility: 0.2,
            riskFreeRate: 0.05,
            optionType: 'invalid'
        });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('optionPrice');
        expect(response.body.optionPrice).toBeNaN();
    });
});
