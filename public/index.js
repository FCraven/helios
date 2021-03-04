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


      const createCurrentWeather =()=> {

        const rootDiv = document.getElementById('root')

          const { apparentTemperature: feelsLike, cloudCover, dewPoint,
                  humidity, icon, nearestStormBearing, nearestStormDistance,
                  ozone, precipIntensity, precipProbability, pressure, summary,
                  temperature, time, uvIndex, visibility, windBearing,
                  windGust, windSpeed } = forecast.currently




                  //TOP PORTION WITH CURRENT WEATHER INFO
                  const topWeatherContainer = document.createElement('section')
                  topWeatherContainer.setAttribute('id','top-weather-container')
                  topWeatherContainer.classList.add('flex', 'justify-evenly', 'align-center')

                  //ICON
                  const img = document.createElement('img');
                  const mainIcon = forecast.currently.icon;
                  img.setAttribute('src', iconsObject[mainIcon]);
                  img.setAttribute('id','weather-icon')



                  const bottomWeatherContainer = document.createElement('section')
                  bottomWeatherContainer.setAttribute('id','bottom-weather-container')
                  bottomWeatherContainer.classList.add('flex', 'justify-evenly', 'align-center')

                  Object.keys(forecast.currently).forEach(el => {

                    const dataContainer = document.createElement('article');
                    dataContainer.classList.add('weather-data', 'flex', 'justify-between', 'align-center');

                    //create div for key and a separate div for value
                    const dataTitle = document.createElement('span');

                    dataTitle.textContent = `${el}`;
                    dataTitle.style.padding = '5px'
                    dataTitle.classList.add('data-title', 'flex', 'justify-flex-start', 'align-center');


                    const dataValue = document.createElement('p');
                    dataValue.textContent = `${forecast.currently[el]}`;
                    dataValue.classList.add('data-value');

                    dataContainer.appendChild(dataTitle);
                    dataContainer.appendChild(dataValue);
                    bottomWeatherContainer.appendChild(dataContainer);
                  })

                  topWeatherContainer.appendChild(img)

                  rootDiv.appendChild(topWeatherContainer)
                  rootDiv.appendChild(bottomWeatherContainer)

                  const handleOrientation=(event)=> console.log('ORIENTATION EVENT---> ', event)
                  window.addEventListener("deviceorientation", handleOrientation, true);
      //create a main view
            //current weather on top
            //middle nav bar to change content on the bottom
            //daily / hourly / minutely
            //flags/warnings?
            //

      }


      createCurrentWeather()


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
