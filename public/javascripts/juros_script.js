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