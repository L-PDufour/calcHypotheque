// script.js

// Display loan amount value dynamically

const loanAmountInput = document.getElementById('loanAmount');
const loanAmountOutput = document.getElementById('loanAmountOutput');
loanAmountOutput.textContent = loanAmountInput.value;

loanAmountInput.addEventListener('input', function() {
    loanAmountOutput.textContent = this.value;
});

const ctx = document.getElementById('mortgageChart').getContext('2d');
let chart;

// Function to update Chart.js chart with new data
const updateChart = (data) => {
    if (chart) {
        chart.destroy();
    }
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Loan Amount', 'Interest Rate', 'Loan Term', 'Monthly Payment'],
            datasets: [{
                label: 'Mortgage Details',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};

// Function to extract mortgage data from form and update chart
const handleSubmit = async () => {
    const formData = new FormData(document.getElementById('mortgage-form'));
    const loanAmount = parseInt(formData.get('loanAmount'));
    const interestRate = parseFloat(formData.get('interestRate'));
    const loanTerm = parseInt(formData.get('loanTerm'));

    const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, loanTerm);
    updateChart([loanAmount, interestRate, loanTerm, monthlyPayment]);
};

// Function to calculate monthly mortgage payment
const calculateMonthlyPayment = (loanAmount, interestRate, loanTerm) => {
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const monthlyPayment = loanAmount * monthlyInterestRate / (1 - (1 + monthlyInterestRate) ** -numberOfPayments);
    return monthlyPayment.toFixed(2);
};

// Submit form handler
document.getElementById('mortgage-form').addEventListener('submit', function(event) {
    event.preventDefault();
    handleSubmit();
});

