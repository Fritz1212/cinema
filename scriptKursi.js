document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  const seats = document.querySelectorAll('.row .seat:not(.occupied)');
  const count = document.getElementById('count');
  const total = document.getElementById('total');
  const movieSelector = document.getElementById('selectedMovie');
  const movieContainer = document.querySelector(".movie-container");
  const movieTitle = localStorage.getItem('movieTitle');

  function handleMovieSelection(movieTitle) {
    movieSelector.innerText = `Film yang dipilih: ${movieTitle}`;
  }

  handleMovieSelection(movieTitle);

  movieSelector.addEventListener("click", handleMovieSelection);

  fetch('https://seleksi-sea-2023.vercel.app/api/movies')
    .then(response => response.json())
    .then(data => {
      const buyTicketButtons = document.querySelectorAll('.tiket-bought');
      buyTicketButtons.forEach(button => {
        button.addEventListener('click', () => {
          const movieTitle = button.getAttribute('data-movie-title');
          const selectedMovie = data.find(movie => movie.title === movieTitle);
          if (selectedMovie) {
            setMovieData(data.indexOf(selectedMovie), selectedMovie.ticket_price);
            handleMovieSelection(selectedMovie.title);
            ticketPrice = +selectedMovie.ticket_price;
          }
        });
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });

  populateUI();

  let ticketPrice = +movieSelector.value;

  const moviePrice = localStorage.getItem('moviePrice');

  function updateSelectedCount(moviePrice) {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    const totalPrice = total.innerText = selectedSeatsCount * moviePrice;
    parseInt(totalPrice)
    localStorage.setItem('ticketPrice', totalPrice)
  }

  function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
      seats.forEach((seat, index) => {
        if (selectedSeats.indexOf(index) > -1) {
          seat.classList.add('selected');
        }
      });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
      movieSelector.selectedIndex = selectedMovieIndex;
    }
  }

  movieSelector.addEventListener('change', e => {
    moviePrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount(moviePrice);
  });

  container.addEventListener('click', e => {
    if (
      e.target.classList.contains('seat') &&
      !e.target.classList.contains('occupied')
    ) {
      e.target.classList.toggle('selected');

      updateSelectedCount(moviePrice);
    }
  });

});
