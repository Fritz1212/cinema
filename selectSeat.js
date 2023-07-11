document.addEventListener('DOMContentLoaded', () => {
  let balance = localStorage.getItem("balance");
  if (balance === null) {
    balance = 100000; 
    localStorage.setItem("balance", balance); // Store initial balance in localStorage
  } else {
    balance = parseInt(balance); // Convert the stored balance to a number
  }
  
  const movieContainer = document.getElementById("movie-container");
  const balanceDisplay = document.getElementById("balance-display"); 

  function updateBalanceDisplay() {
    const balanceInt = parseInt(balance);
    balanceDisplay.innerText = `Your current balance is: Rp ${balanceInt.toLocaleString("id-ID")}`;
  }
  
  function selectSeat(event) {
    const button = event.target;
    let movieInfo = button.dataset.movieInfo;
    let title, ticket_price, age_rating;
    try {
        const parsedMovieInfo = JSON.parse(movieInfo);
        title = parsedMovieInfo.title;
        console.log(title);
        ticket_price = parsedMovieInfo.ticket_price;
        age_rating = parsedMovieInfo.age_rating;
    } catch (error) {
        console.error(error);
        // Attempt to fix the JSON data
        movieInfo = movieInfo.slice(0, 205) + '"' + movieInfo.slice(205);
        try {
            const parsedMovieInfo = JSON.parse(movieInfo);
            title = parsedMovieInfo.title;
            ticket_price = parsedMovieInfo.ticket_price;
            age_rating = parsedMovieInfo.age_rating;
        } catch (error) {
            console.error(error);
            // handle the error here
        }
    }
    localStorage.setItem('movieTitle', title);
    localStorage.setItem('moviePrice', ticket_price);
    localStorage.setItem('movieAge', age_rating);
    window.location.href = 'seating.html'; 
}


  function createMovieHTML(movieDetails) {
    const movieItemHTML = `
      <div class="movie-details">
        <img src="${movieDetails.poster_url}" alt="${movieDetails.title}">
        <div class="movie-info">
          <h2 class="movie-title">${movieDetails.title}</h2>
          <p class="movie-description">${movieDetails.description}</p>
          <p class="movie-age-rating">Age Rating: ${movieDetails.age_rating}</p>
          <p class="movie-release-date">Release Date: ${movieDetails.release_date}</p>
          <p class="movie-ticket-price">Ticket Price: Rp ${movieDetails.ticket_price.toLocaleString("id-ID")}</p>
          <button class="selectSeat" data-movie-info='${JSON.stringify(movieDetails)}'>Select Seat</button>
        </div>
      </div>
    `;

    return movieItemHTML;
  }

  fetch('https://seleksi-sea-2023.vercel.app/api/movies')
    .then(response => response.json())
    .then(data => {
      let movieHTML = '';

      for (let i = 0; i < data.length; i++) {
        const movieDetails = data[i];
        const movieItemHTML = createMovieHTML(movieDetails);
        movieHTML += movieItemHTML;
      }

      movieContainer.innerHTML = movieHTML;

      const selectSeatButtons = document.querySelectorAll(".selectSeat");
      selectSeatButtons.forEach(button => {
      button.addEventListener("click", selectSeat);
      });

      updateBalanceDisplay();
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
