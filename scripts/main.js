// sample api data response for designing views
const sampleData = {
  coord: { lon: -0.13, lat: 51.51 },
  weather: [
    {
      id: 300,
      main: 'Drizzle',
      description: 'light intensity drizzle',
      icon: '09d'
    }
  ],
  base: 'stations',
  main: {
    temp: 280.32,
    pressure: 1012,
    humidity: 81,
    temp_min: 279.15,
    temp_max: 281.15
  },
  visibility: 10000,
  wind: { speed: 4.1, deg: 80 },
  clouds: { all: 90 },
  dt: 1485789600,
  sys: {
    type: 1,
    id: 5091,
    message: 0.0103,
    country: 'GB',
    sunrise: 1485762037,
    sunset: 1485794875
  },
  id: 2643743,
  name: 'London',
  cod: 200
}

// end sample data

// initialize object, flow
console.log('JS = MAIN.JS WORKING')
const input = document.getElementById('zip-code-input')
const displayElements = document.querySelectorAll('.display-element')

const weatherViewer = {
  url: 'https://api.openweathermap.org/data/2.5/weather?',
  key: apiKey,
  // get user location if allowed
  getLocation: () => {
    console.log('weatherViewer.getLocation() called')
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position =>
        weatherViewer.fetchDataByCoords(position.coords)
      )
    }
  },
  // search by user provided zip
  handleZip: () => {
    console.log('weatherViewer.handleZip() called')
    let zip = input.value
    weatherViewer.fetchDataByZip(zip)
  },
  // fetch data by zip
  fetchDataByZip: location => {
    console.log('weatherViewer.fetchDataByZip() called')
    let url =
      weatherViewer.url + `zip=${location},us` + `&APPID=${weatherViewer.key}`
    fetch(url)
      .then(res => res.json())
      .then(json => weatherViewer.updateView(json))
      .catch(err => console.log(err))
  },
  //   fetch data when user allows geolocation
  fetchDataByCoords: coords => {
    console.log('weatherViewer.fetchDataByCoords() called')
    let url =
      weatherViewer.url +
      `lat=${coords.latitude}&lon=${coords.longitude}` +
      `&APPID=${weatherViewer.key}`
    fetch(url)
      .then(res => res.json())
      .then(json => weatherViewer.updateView(json))
      .catch(err => console.log(err))
  },
  updateView: data => {
    console.log('updateView() called')
    displayElements.forEach(element => {
      element.id === 'location' ? (element.innerText = data.name) : null
      element.id === 'temperature'
        ? (element.innerText = kelvinToFahrenheit(data.main.temp))
        : null
      element.id === 'conditions'
        ? (element.innerText = data.weather[0].main)
        : null
    })
  }
}

// convert kelvin to fahrenheit (k => temp in kelvin)
const kelvinToFahrenheit = k => {
  return parseInt((k * 9) / 5 - 459.67)
}

// convert kelvin to celcius (k => temp in kelvin)
const kelvinToCelsius = k => {
  return k - 273.5
}

weatherViewer.updateView(sampleData)
