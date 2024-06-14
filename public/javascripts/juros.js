function calculateLoan(loanAmount, loanTerm, interestRate, interestType) {
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

    return {
        timeToRepay,
        totalAmountPaid: totalAmountPaid.toFixed(2),
        totalInterestPaid: totalInterestPaid.toFixed(2)
    };
}

// Conditionally export for Node.js testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = calculateLoan;
}
