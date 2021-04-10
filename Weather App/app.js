//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const WeatherApi = {
	key: "1dafa4fdda68f02b5b1600102140e270",
	baseurl: "https://api.openweathermap.org/data/2.5/weather",
};
//add event listner
const searchInputBox = document.getElementById("input-box");

searchInputBox.addEventListener("keypress", (event) => {
	if (event.keyCode == 13) {
		console.log(searchInputBox.value);
		getWeatherReport(searchInputBox.value);
		document.querySelector(".weather-body").style.display = "block";
	}
});

//get weather reports
function getWeatherReport(city) {
	fetch(`${WeatherApi.baseurl}?q=${city}&units=metric&appid=${WeatherApi.key}`)
		.then((weather) => {
			return weather.json();
		})
		.then(showWeatherReport);
}

//display
function showWeatherReport(weather) {
	console.log(weather);

	let city = document.getElementById("city");
	city.innerText = `${weather.name},${weather.sys.country}`;
	let temperature = document.getElementById("temp");
	temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

	let minmax = document.getElementById("min-max");
	minmax.innerHTML = `${Math.floor(
		weather.main.temp_min
	)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;

	let weathertype = document.getElementById("weather");
	weathertype.innerHTML = `${weather.weather[0].main}`;

	let date = document.getElementById("date");
	var todayDate = new Date();
	date.innerText = dateManage(todayDate);

	if (weathertype.textContent == "Clear") {
		document.body.style.backgroundImage = "url('clear.jpg')";
	} else if (weathertype.textContent == "Snow") {
		document.body.style.backgroundImage = "url('snow.jpg')";
	} else if (weathertype.textContent == "Rain") {
		document.body.style.backgroundImage = "url('rain.jpg')";
	} else if (weathertype.textContent == "Clouds") {
		document.body.style.backgroundImage = "url('cloudy.jpg')";
	} else if (weathertype.textContent == "Haze") {
		document.body.style.backgroundImage = "url('haze.jpg')";
	}
}
//manage date
function dateManage(d) {
	let days = [
		"sunday",
		"monday",
		"tuesday",
		"wednesday",
		"thursday",
		"friday",
		"saturday",
	];
	let months = [
		"january",
		"february",
		"march",
		"april",
		"may",
		"june",
		"july",
		"august",
		"september",
		"october",
		"november",
		"december",
	];

	let year = d.getFullYear();
	let month = months[d.getMonth()];
	let date = d.getDate();
	let day = days[d.getDay()];
	return `${date} ${month} (${day}), ${year}`;
}
