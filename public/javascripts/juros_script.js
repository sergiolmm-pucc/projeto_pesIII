function calculateLoan() {
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const loanTerm = parseInt(document.getElementById('loanTerm').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const interestType = document.getElementById('interestType').value;

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

    document.getElementById('timeToRepay').innerText = timeToRepay + ' meses';
    document.getElementById('totalAmountPaid').innerText = totalAmountPaid.toFixed(2);
    document.getElementById('totalInterestPaid').innerText = totalInterestPaid.toFixed(2);

    document.getElementById('results').style.display = 'block';
}


/*
document.getElementById('loanForm').addEventListener('submit', function(event) {
    event.preventDefault();
    calculateLoan();
});

function calculateLoan() {
    const formData = new FormData(document.getElementById('loanForm'));
    fetch('/calculateLoan', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('timeToRepay').innerText = data.timeToRepay + ' meses';
        document.getElementById('totalAmountPaid').innerText = data.totalAmountPaid;
        document.getElementById('totalInterestPaid').innerText = data.totalInterestPaid;
        document.getElementById('results').style.display = 'block';
    })
    .catch(error => console.error('Error:', error));
}
*/