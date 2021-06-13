const weahter = document.querySelector(".js-weather");

const API_KEY = "1171114490b8f4c78537bbb2a550e403";

//weather API 받는 사이트: https://openweathermap.org/
const COORDS = "coords";

function getWeather(lat, lon) {
  //https://api.openweathermap.org/data/2.5/weather?lat=37.6166329&lon=126.83154830000001&APPID=1171114490b8f4c78537bbb2a550e403&units=metric
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json(); //response는 네트워크 데이타
    })
    .then(function (json) {
      console.log(json);
      const temperature = json.main.temp.toFixed(1); //소숫점 1자리까지 표기
      const place = json.name;
      weahter.innerText = `🏠 ${temperature}℃ @ ${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  ///console.log(position);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude, //latitude : latitude 이름이 같을 때 약식 가능
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Can't access Geo location!");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords == null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    console.log(parsedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
