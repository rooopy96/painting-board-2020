const weather = document.querySelector(".jsWeather");

const API_KEY = "43fcd5007123eb610754f835fea97a2c";

const COORDS_LS = "coords"



function paintWeather(lat, lon){
	fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then(function(response){
		return response.json();
	}).then(function(myJson){
		const city = myJson.name;
		const temp = myJson.main.temp;
		weather.innerText = `${temp} @ ${city}`
	})
}

function saveLocation(obj){
	localStorage.setItem(COORDS_LS, JSON.stringify(obj));
}

function getGeoSuccess(location){
	const latitude = location.coords.latitude;
	const longitude = location.coords.longitude;

	const locationObj = {
		latitude,
		longitude
	}

	paintWeather(latitude, longitude);
	saveLocation(locationObj);
}

function getGeoError(){
	console.log("Can't find location")
}

function getGeoLocation(){
	navigator.geolocation.getCurrentPosition(getGeoSuccess, getGeoError);
}

function getWeather(){
	const currentLocation = localStorage.getItem(COORDS_LS);

	if(currentLocation === null) {
		getGeoLocation();
	} else {
		const parsedLocation = JSON.parse(currentLocation);
		paintWeather(parsedLocation.latitude, parsedLocation.longitude);
	}
}

function init(){
	getWeather();
}

init();