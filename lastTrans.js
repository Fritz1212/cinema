document.addEventListener('DOMContentLoaded', () => {
    const movieDisplay = document.getElementById("movie");
    const nameDisplay = document.getElementById("name");
    const totalDisplay = document.getElementById("total");
    const name = localStorage.getItem('name')
    const age = localStorage.getItem('age');
    const movie = localStorage.getItem('movieTitle');
    const ticketPrice = localStorage.getItem('ticketPrice');
    const deductButton = document.getElementById('deductButton');
     deductButton.addEventListener('click', handleDeductBalanceButtonClick);

    movieDisplay.innerText = movie;
    nameDisplay.innerText = name;
    totalDisplay.innerText = ticketPrice.toString();

    function handleDeductBalanceButtonClick() {
        const ticketPrice = parseInt(localStorage.getItem('ticketPrice'));
        const balance = parseInt(localStorage.getItem('balance'));
      
        if (balance >= ticketPrice) {
          localStorage.setItem('balance', (balance - ticketPrice).toString());
          alert(`Rp ${ticketPrice.toLocaleString("id-ID")} has been deducted from your balance.`);
          window.location.href = "index.html";
        } else {
          alert(`Insufficient balance to purchase the ticket.`);
        }
      }
      
    
});