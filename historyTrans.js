document.addEventListener('DOMContentLoaded', () => {
    const titleDisplay = document.getElementById("titleHistory");
    const nameDisplay = document.getElementById("nameHistory");
    const totalDisplay = document.getElementById("priceHistory");
    const seatDisplay = document.getElementById("seatHistory");
  
    const name = localStorage.getItem('name');
    const movie = localStorage.getItem('movieTitle');
    const ticketPrice = localStorage.getItem('ticketPrice');
  
    // Retrieve existing tickets from localStorage
    let tickets = JSON.parse(localStorage.getItem('tickets')) || [];
  
    // Create a new ticket object
    const newTicket = {
      name: name,
      movie: movie,
      ticketPrice: ticketPrice
    };
  
    tickets.push(newTicket);
  
    localStorage.setItem('tickets', JSON.stringify(tickets));
  
    nameDisplay.innerText = newTicket.name;
    titleDisplay.innerText = newTicket.movie;
    totalDisplay.innerText = newTicket.ticketPrice;
  
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = ''; 
  
    for (const ticket of tickets) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${ticket.name}</td>
        <td>${ticket.movie}</td>
        <td>${ticket.ticketPrice}</td>
        <td>${ticket.seat}</td>
      `;
      tableBody.appendChild(row);
    }
  });
  