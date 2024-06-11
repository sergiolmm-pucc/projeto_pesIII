var express = require('express');
var router = express.Router();
const path = require('path');

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../views/juros_index.html'));
});

router.post('/calculateLoan', function(req, res) {
  const loanAmount = parseFloat(req.body.loanAmount);
  const loanTerm = parseInt(req.body.loanTerm);
  const interestRate = parseFloat(req.body.interestRate);
  const interestType = req.body.interestType;

  let totalAmountPaid;
  let totalInterestPaid;
  let monthlyInterestRate;
  let timeToRepay;

  if (interestType === "monthly") {
    monthlyInterestRate = interestRate / 100;
    totalAmountPaid = loanAmount * Math.pow(1 + monthlyInterestRate, loanTerm);
    totalInterestPaid = totalAmountPaid - loanAmount;
    timeToRepay = loanTerm;
  } else if (interestType === "yearly") {
    monthlyInterestRate = interestRate / (12 * 100);
    timeToRepay = loanTerm * 12;
    totalAmountPaid = loanAmount * Math.pow(1 + monthlyInterestRate, timeToRepay);
    totalInterestPaid = totalAmountPaid - loanAmount;
  }

  res.json({
    timeToRepay: timeToRepay,
    totalAmountPaid: totalAmountPaid.toFixed(2),
    totalInterestPaid: totalInterestPaid.toFixed(2)
  });
});

module.exports = router;
