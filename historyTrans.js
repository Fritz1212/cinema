document.addEventListener('DOMContentLoaded', () => {
    const titleDisplay = document.getElementById("titleHistory");
    const nameDisplay = document.getElementById("nameHistory");
    const totalDisplay = document.getElementById("priceHistory");
    const seatDisplay = document.getElementById("seatHistory");
    const button = document.getElementById("reset")
  
    const name = localStorage.getItem('name');
    const movie = localStorage.getItem('movieTitle');
    const ticketPrice = localStorage.getItem('ticketPrice');
    const seat = localStorage.getItem("selectedSeats");

    // Retrieve existing tickets from localStorage
    let tickets = JSON.parse(localStorage.getItem('tickets')) || [];
  
    // Create a new ticket object
    const newTicket = {
      name: name,
      movie: movie,
      ticketPrice: ticketPrice,
      seat: seat
    };
    
    // Check if the ticket already exists in the tickets array
    const isDuplicate = tickets.some(ticket => ticket.name === newTicket.name);

    // Add the new ticket if it's not a duplicate
    if (!isDuplicate) {
    tickets.push(newTicket);
    }

    localStorage.setItem('tickets', JSON.stringify(tickets));
  
    nameDisplay.innerText = newTicket.name;
    titleDisplay.innerText = newTicket.movie;
    totalDisplay.innerText = newTicket.ticketPrice;
    seatDisplay.innerText = newTicket.seat;
  
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

    button.addEventListener("click", resetRow);

    function resetRow() {
      document.getElementById("body").remove();
      localStorage.removeItem('tickets')
    }

  });
  