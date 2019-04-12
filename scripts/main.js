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
console.log('js working')
const main = document.querySelector('main')
const sections = document.querySelectorAll('section')
const input = document.querySelector('input')

const weatherViewer = {
  loading: true,
  zip: null,
  weather: null,
  main: main,
  sections: sections,
  // get user location if allowed
  getLocation: () => {
    console.log('weatherViewer.getLocation() called')
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position =>
        console.log(position)
      )
    }
  },
  // search by user provided zip
  handleZip: () => {
    console.log('weatherViewer.handleZip() called')
    let zip = input.value
    weatherViewer.fetchData(zip)
  },
  // fetch data by position or zip
  fetchData: zip => console.log('calling api'),
  updateView: data => console.log('updating view'),
  initialize: () => console.log('initialized'),
  data: sampleData
}

console.log(weatherViewer)
weatherViewer.initialize()

// convert kelvin to fahrenheit (k => temp in kelvin)
const kelvinToFahrenheit = k => {
  return (k * 9) / 5 - 459.67
}

// convert kelvin to celcius (k => temp in kelvin)
const kelvinToCelsius = k => {
  return k - 273.5
}
