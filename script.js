// Smooth scrolling
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Loan details
const loanDetails = {
  personal: { requirements: "Age 18+, Proof of Income, ID", downPayment: "10% of loan amount", defaultRate: 12 },
  business: { requirements: "Business Registration, 2 Years Financials, ID", downPayment: "15% of loan amount", defaultRate: 10 },
  mortgage: { requirements: "ID, Proof of Income, Credit Check", downPayment: "20% of property value", defaultRate: 8 }
};

// Update loan info
document.getElementById('loan-type').addEventListener('change', function() {
  const type = this.value;
  const info = document.getElementById('loan-info');
  if (loanDetails[type]) {
    info.innerHTML = `Requirements: ${loanDetails[type].requirements} <br>
                      Recommended Down Payment: ${loanDetails[type].downPayment} <br>
                      Suggested Interest Rate: ${loanDetails[type].defaultRate}%`;
    document.getElementById('rate').value = loanDetails[type].defaultRate;
  } else {
    info.innerHTML = "";
    document.getElementById('rate').value = "";
  }
});

// Calculate loan payment
document.getElementById('calculate').addEventListener('click', function() {
  const type = document.getElementById('loan-type').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const rate = parseFloat(document.getElementById('rate').value);
  const months = parseFloat(document.getElementById('months').value);

  if (!type) { alert("Please select a loan type."); return; }
  if (!amount || !rate || !months) {
    document.getElementById('result').innerText = "Please fill all fields.";
    return;
  }

  const monthlyRate = rate / 100 / 12;
  const payment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
  document.getElementById('result').innerText = `Estimated Monthly Payment: $${payment.toFixed(2)}`;
});