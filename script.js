const form = document.getElementById("searchForm");
const input = document.getElementById("target");

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
  } catch (error) {
    alert("City not found. Try again!");
    console.error(error);
  }
}
