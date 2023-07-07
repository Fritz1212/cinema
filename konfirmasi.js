document.addEventListener('DOMContentLoaded', () => {
    const movieAge = parseInt(localStorage.getItem('movieAge'));
    const confirmationForm = document.getElementById('confirmationForm');
    const nameInput = document.getElementById('name');
    const ageInput = document.getElementById('age');
    const redirectButton = document.getElementById('redirectButton');

  
    confirmationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const age = parseInt(ageInput.value)
      const name = nameInput.value;
  
      if (age < movieAge) {
        alert('You must be at least ' + movieAge + ' years old to proceed.');
        localStorage.setItem('name', name);
        localStorage.setItem('age', age);
        console.log(age)
        console.log(movieAge)
        return; 
      } else {

      console.log(age)
      console.log(movieAge)

      localStorage.setItem('name', name);
      localStorage.setItem('age', age);
  
      nameInput.value = '';
      ageInput.value = '';
  
      alert('Name and age stored successfully!');
      }
    });

    redirectButton.addEventListener('click', () => {
      const age = parseInt(localStorage.getItem('age'));

      if (age < movieAge) {
        alert('You must be at least ' + movieAge + ' years old to proceed.');
      } else {
        window.location.href = 'lastTransaksi.html'
      }
    });
  
    
  });
  