document.addEventListener('DOMContentLoaded', function () {
  const apiKey = 'fb1ac1be1e0e6c1087cfe14edbe7b4aa'; // Replace 'YOUR_API_KEY' with your actual OpenWeatherAPI key
  const button = document.querySelector('button');
  const cityInput = document.getElementById('cityInput');
  const cityName = document.getElementById('cityName');
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  button.addEventListener('click', function () {
      const city = cityInput.value;
      if (city.trim() === '') {
          alert('Please enter a city name');
          return;
      }

      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
          .then(response => response.json())
          .then(data => {
              cityName.textContent = `Weather forecast for ${data.city.name}`;

              for (let i = 0; i < 5; i++) {
                  const date = new Date(data.list[i * 8].dt * 1000);
                  const dayName = days[date.getDay()];
                  const icon = data.list[i * 8].weather[0].icon;
                  const minTempCelsius = Math.round(data.list[i * 8].main.temp_min);
                  const maxTempCelsius = Math.round(data.list[i * 8].main.temp_max);
                  const minTempFahrenheit = celsiusToFahrenheit(minTempCelsius);
                  const maxTempFahrenheit = celsiusToFahrenheit(maxTempCelsius);

                  document.getElementById(`day${i + 1}`).textContent = dayName;
                  document.getElementById(`img${i + 1}`).src = `http://openweathermap.org/img/w/${icon}.png`;
                  document.getElementById(`day${i + 1}Min`).textContent = `Min: ${minTempFahrenheit}°F`;
                  document.getElementById(`day${i + 1}Max`).textContent = `Max: ${maxTempFahrenheit}°F`;
              }
          })
          .catch(error => {
              console.error('Error fetching data:', error);
              alert('Error fetching data. Please try again later.');
          });
  });
});

// Function to convert temperature from Celsius to Fahrenheit
function celsiusToFahrenheit(celsius) {
  return (celsius * 9/5) + 32;
}