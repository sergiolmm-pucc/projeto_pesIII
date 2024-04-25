var express = require('express');
var router = express.Router();



// Function to calculate the Black-Scholes option price

//function calculateOptionPrice(stockPrice, strikePrice, timeToExpiration, volatility, riskFreeRate, optionType) {
function calculateOptionPrice(stockPrice, strikePrice, timeToExpiration, volatility, riskFreeRate, optionType) {
  // Constants
  var d1 = (Math.log(stockPrice / strikePrice) + (riskFreeRate + 0.5 * volatility * volatility) * timeToExpiration) / (volatility * Math.sqrt(timeToExpiration));
  var d2 = d1 - volatility * Math.sqrt(timeToExpiration);

  // Calculate option price
  if (optionType === 'call') {
      return stockPrice * cumulativeDistribution(d1) - strikePrice * Math.exp(-riskFreeRate * timeToExpiration) * cumulativeDistribution(d2);
  } else if (optionType === 'put') {
      return strikePrice * Math.exp(-riskFreeRate * timeToExpiration) * cumulativeDistribution(-d2) - stockPrice * cumulativeDistribution(-d1);
  } else {
      return NaN;
  }
}

// Function to calculate cumulative normal distribution
function cumulativeDistribution(x) {
  const a1 = 0.319381530;
  const a2 = -0.356563782;
  const a3 = 1.781477937;
  const a4 = -1.821255978;
  const a5 = 1.330274429;
  const pi = Math.PI;

  var L = Math.abs(x);
  var K = 1 / (1 + 0.2316419 * L);
  var w = 1 - 1 / Math.sqrt(2 * pi) * Math.exp(-L * L / 2) * (a1 * K + a2 * Math.pow(K, 2) + a3 * Math.pow(K, 3) + a4 * Math.pow(K, 4) + a5 * Math.pow(K, 5));

  if (x < 0) {
      w = 1 - w;
  }
  return w;
}

/* GET options price. */
router.get('/', function(req, res, next) {
  
  // Retrieve parameters from query string
  var stockPrice = parseFloat(req.query.stockPrice);
  var strikePrice = parseFloat(req.query.strikePrice);
  var timeToExpiration = parseFloat(req.query.timeToExpiration);
  var volatility = parseFloat(req.query.volatility);
  var riskFreeRate = parseFloat(req.query.riskFreeRate);
  var optionType = req.query.optionType;

  // Calculate option price
  var optionPrice = calculateOptionPrice(stockPrice, strikePrice, timeToExpiration, volatility, riskFreeRate, optionType);

  //  response
  res.json({ optionPrice: optionPrice });
});

module.exports.calculateOptionPrice = calculateOptionPrice;

// module.exports = router;
