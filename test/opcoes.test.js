// __tests__/optionsCalculator.test.js

const calculateOptionPrice = require('../routes/opcoes')//.calculateOptionPrice;


describe('Options Calculator', () => {
    it('should calculate the option price correctly for a call option', () => {

        // const stockPrice = 100;
        // const strikePrice = 90;
        // const timeToExpiration = 1;
        // const volatility = 0.2;
        // const riskFreeRate = 0.05;
        // const optionType = 'call';

        const stockPrice = 0;
        const strikePrice = 0;
        const timeToExpiration = 0;
        const volatility = 0;
        const riskFreeRate = 0;
        const optionType = 'call';


        const expectedOptionPrice = 14.656438634490996;
        
        var optionPrice = calculateOptionPrice(stockPrice, strikePrice, timeToExpiration, volatility, riskFreeRate, optionType);


        expect(optionPrice).toBeCloseTo(expectedOptionPrice, 4);
    });

});
