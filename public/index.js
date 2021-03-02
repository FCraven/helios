'use strict'

// const queryUrl = `/api/weather?lat=${latitude}&lon=${longitude}`;
// const response = await fetch(queryUrl);
// const data = await response.json();
const spinner = document.getElementById('loading-spinner');
const status = document.getElementById('status');
const loadingSection = document.getElementById('loading-section')

window.onload =()=> {
  const success = async (position)=> {
      //Dependencies
      let forecast;
      const { latitude, longitude } = position.coords;
      const iconsObject = {
        'clear-day': './svg/sun.svg',
        'clear-night': './svg/clear-night.svg',
        'rain' : './svg/cloudy-rain.svg',
        'snow' : './svg/cloudy-snow.svg',
        'sleet' : './svg/storm-rain.svg',
        'wind' : './svg/cloudy-windy.svg',
        'fog': './svg/cloud-warning.svg',
        'cloudy': './svg/cloudy-heavy.svg',
        'partly-cloudy-day': './svg/cloudy-partly-sunny.svg',
        'partly-cloudy-night': './svg/partly-cloudy-night.svg',
        'hail': './svg/cloudy-warning.svg',
        'thunderstorm' : './svg/cloudy-lightning-severe.svg',
        'tornado' : './svg/tornado.svg'
      }

      //FETCH FORECAST BASED ON USER LOCATION
      try{
          const queryUrl = `/api/weather?lat=${latitude}&lon=${longitude}&units=auto`;
          const response = await fetch(queryUrl);
          const data = await response.json();
          forecast = data;
        } catch(error) {
            console.log('Error fetching weather data')
        }

      //HIDE SPINNER
      loadingSection.style.display = 'none';
      status.textContent = '';


      const createCurrent =()=> {
          const { apparentTemperature: feelsLike, cloudCover, dewPoint,
                  humidity, icon, nearestStormBearing, nearestStormDistance,
                  ozone, precipIntensity, precipProbability, pressure, summary,
                  temperature, time, uvIndex, visibility, windBearing,
                  windGust, windSpeed } = forecast.currently

        const currentContainer = document.createElement('section')
        currentContainer.setAttribute('id', 'current-container')
        // currentContainer.classList.add()




      //create a main view
            //current weather on top
            //middle nav bar to change content on the bottom
            //daily / hourly / minutely
            //flags/warnings?
            //

      }






        const img = document.createElement('img')
        const mainIcon = forecast.currently.icon

        console.log(forecast)

        img.setAttribute('src', iconsObject[mainIcon])
        img.setAttribute('height', '200px')
        img.setAttribute('width', '200px')

        document.getElementById('root').appendChild(img)
      //set forecast to localStorage?

      //handle loading all DOM content here


      //icon
      //temp
      //feels like
      //5 day
      //hourly
      // by the minute?

      //anime js?



    }

  const error =()=> {
      //do something here that makes a nice landing screen and prompts user to search for weather
      //UNABLE TO GET COORDINATES FROM DEVICE
      console.log('Unable to retrieve your location');
    }

  const options = {
    enableHighAccuracy: true
  }

  if('geolocation' in navigator) {
        console.log('Locating…');
        //insert loading spinner here
        status.innerHTML = 'Finding your current location...'
        navigator.geolocation.getCurrentPosition(success, error, options)
    } else {
        console.log('Geolocation is not supported by your browser');
    }
}
