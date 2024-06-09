const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../views/optionPrice.html'));
});

router.post('/calculate-option-price', function(req, res) {
  const { stockPrice, strikePrice, timeToMaturity, volatility, riskFreeRate, optionType, exerciseType } = req.body;

  let optionPrice;

  if (exerciseType === 'european') {
    optionPrice = calculateEuropeanOptionPrice(stockPrice, strikePrice, timeToMaturity, volatility, riskFreeRate, optionType);
  } else {
    optionPrice = calculateAmericanOptionPrice(stockPrice, strikePrice, timeToMaturity, volatility, riskFreeRate, optionType);
  }

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Option Price Result</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f9;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .container {
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        h1 {
          color: #333;
        }
        p {
          font-size: 1.2em;
          color: #555;
        }
        a {
          display: inline-block;
          margin-top: 20px;
          padding: 10px 20px;
          background-color: #007bff;
          color: #ffffff;
          text-decoration: none;
          border-radius: 5px;
        }
        a:hover {
          background-color: #0056b3;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Option Price Result</h1>
        <p>Option Price: ${optionPrice}</p>
        <a href="/option">Back to Calculator</a>
      </div>
    </body>
    </html>
  `);
});


// Black-Scholes Model for European Options
function calculateEuropeanOptionPrice(S, K, T, v, r, optionType) {
  const d1 = (Math.log(S / K) + (r + v * v / 2) * T) / (v * Math.sqrt(T));
  const d2 = d1 - v * Math.sqrt(T);
  const nd1 = normalCDF(d1);
  const nd2 = normalCDF(d2);

  let price;
  if (optionType === 'call') {
    price = S * nd1 - K * Math.exp(-r * T) * nd2;
  } else {
    price = K * Math.exp(-r * T) * normalCDF(-d2) - S * normalCDF(-d1);
  }
  return parseFloat(price.toFixed(2));
}

// Binomial Model for American Options
function calculateAmericanOptionPrice(S, K, T, v, r, optionType) {
  const N = 1000;  // Number of time steps
  const dt = T / N;
  const u = Math.exp(v * Math.sqrt(dt));
  const d = 1 / u;
  const p = (Math.exp(r * dt) - d) / (u - d);

  let optionValues = Array(N + 1).fill(0);

  for (let i = 0; i <= N; i++) {
    const ST = S * Math.pow(u, i) * Math.pow(d, N - i);
    if (optionType === 'call') {
      optionValues[i] = Math.max(0, ST - K);
    } else {
      optionValues[i] = Math.max(0, K - ST);
    }
  }

  for (let j = N - 1; j >= 0; j--) {
    for (let i = 0; i <= j; i++) {
      optionValues[i] = Math.exp(-r * dt) * (p * optionValues[i + 1] + (1 - p) * optionValues[i]);
      const ST = S * Math.pow(u, i) * Math.pow(d, j - i);
      if (optionType === 'call') {
        optionValues[i] = Math.max(optionValues[i], ST - K);
      } else {
        optionValues[i] = Math.max(optionValues[i], K - ST);
      }
    }
  }

  return parseFloat(optionValues[0].toFixed(2));
}

function normalCDF(x) {
  return (1.0 + erf(x / Math.sqrt(2.0))) / 2.0;
}

function erf(x) {
  const sign = (x >= 0) ? 1 : -1;
  x = Math.abs(x);

  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return sign * y;
}

module.exports = router;
module.exports.calculateEuropeanOptionPrice = calculateEuropeanOptionPrice;
module.exports.calculateAmericanOptionPrice = calculateAmericanOptionPrice;
