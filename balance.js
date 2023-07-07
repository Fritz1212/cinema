document.addEventListener('DOMContentLoaded', () => {
  let balance = localStorage.getItem('balance');
  if (balance === null) {
    balance = 100000; 
    localStorage.setItem("balance", balance); 
  } else {
    balance = parseInt(balance); 
  }

  const balanceDisplay = document.getElementById("balance-display");

  function updateBalanceDisplay() {
    const balanceInt = parseInt(balance)
    balanceDisplay.textContent = `Your current balance is: Rp ${balanceInt.toLocaleString("id-ID")}`;
  }

  const topUpButton = document.getElementById("top-up-btn");
  const withdrawButton = document.getElementById("withdraw-btn");

  topUpButton.addEventListener("click", () => {
    const amount = parseInt(prompt("Enter the top-up amount:"));
    if (!isNaN(amount) && amount > 0) {
      balance += amount;
      updateBalanceDisplay();
      localStorage.setItem('balance', balance);
      alert(`Successfully topped up Rp ${amount.toLocaleString("id-ID")}. Your new balance is Rp ${balance.toLocaleString("id-ID")}.`);
    } else {
      alert("Invalid amount. Please enter a positive number.");
    }
  });

  withdrawButton.addEventListener("click", () => {
    const maxWithdrawalAmount = Math.min(balance, 500000);
    const amount = parseInt(prompt(`Enter the withdrawal amount (Maximum: Rp ${maxWithdrawalAmount.toLocaleString("id-ID")}):`));
    if (!isNaN(amount) && amount > 0) {
      if (amount <= maxWithdrawalAmount) {
        balance -= amount;
        localStorage.setItem('balance', balance);
        updateBalanceDisplay();
        alert(`Successfully withdrew Rp ${amount.toLocaleString("id-ID")}. Your new balance is Rp ${balance.toLocaleString("id-ID")}.`);
      } else {
        alert(`The maximum withdrawal amount is Rp ${maxWithdrawalAmount.toLocaleString("id-ID")}. Please enter a valid amount.`);
      }
    } else {
      alert("Invalid amount. Please enter a positive number.");
    }
  });
  
  updateBalanceDisplay();      
})



