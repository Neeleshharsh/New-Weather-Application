
const form = document.getElementById("searchForm");
const input = document.getElementById("target");
const weatherCard = document.getElementById("weatherCard");

// Predefined text colors (all suitable for a light background)
const textColors = [
  "#ff9c9cff",    // dark gray
  "#37fc30ff", // deep blue
  "#fcff38ff", // strong red
  "#ccffceff", // deep green
  "#ffffffff", // deep green
  "#35ffb8ff", // purple
  "#7bff23ff", // purple
  "#ffe031ff", // purple
  "#ff9c10ff", // purple
  "#38e8ffff", // purple
  "#cfff31ff", // purple
  "#ff813dff"  // deep orange
];

// Function to change text color randomly
function changeTextColor() {
  const color = textColors[Math.floor(Math.random() * textColors.length)];
  
  // Apply to entire card
  weatherCard.style.color = color;

  // Also apply to specific elements explicitly
  document.getElementById("temp").style.color = color;
  document.getElementById("location").style.color = color;
  document.getElementById("dateAndTime").style.color = color;
  document.getElementById("status").style.color = color;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const city = input.value.trim();
  if (city) {
    fetchWeather(city);
    input.value = "";
  }
});

async function fetchWeather(city) {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=79036cbb429744d39a781703252508&q=${city}&aqi=no`;
    const res = await fetch(url);
    const data = await res.json();

    document.getElementById("temp").innerText = `${data.current.temp_c}°C`;
    document.getElementById("location").innerText = data.location.name;
    document.getElementById("dateAndTime").innerText = data.location.localtime;
    document.getElementById("status").innerText = data.current.condition.text;

    // Change text color each time a new city is searched
    changeTextColor();

  } catch (error) {
    alert("City not found. Try again!");
    console.error(error);
  }
}
