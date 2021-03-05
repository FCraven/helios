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

      const determineBearing =(bearing)=> {
        const b = bearing
        if(b > 348.75 && b <= 360 || b >=0 && b <= 11.25){
            return 'North'
        } else if(b > 11.25 && b <= 33.75){
            return 'NNE'
        } else if(b > 33.75 && b <= 56.25){
            return 'NE'
        } else if(b > 56.25 && b <= 78.75){
            return 'ENE'
        } else if(b > 78.75 && b <= 101.25) {
            return 'East'
        } else if(b > 101.25 && b <= 123.75){
            return 'ESE'
        } else if(b > 123.75 && b <= 146.25){
          return 'SE'
        } else if(b > 146.25 && b <= 168.75){
          return 'SSE'
        } else if(b > 168.75 && b <= 191.25){
          return 'South'
        } else if(b > 191.25 && b <= 213.75){
          return 'SSW'
        } else if(b > 213.75 && b <= 236.25){
          return 'SW'
        } else if(b > 236.25 && b <= 258.75){
          return 'WSW'
        } else if(b > 258.75 && b <= 281.25){
          return 'West'
        } else if(b > 281.25 && b <= 303.75){
          return 'WNW'
        } else if(b > 303.75 && b <= 326.25){
          return 'NW'
        } else if(b > 326.25 && b <= 348.75){
          return 'NNW'
        }
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
        const currentWeather = forecast.currently;

        //TOP PORTION WITH CURRENT WEATHER INFO
        const topWeatherContainer = document.createElement('section')
              topWeatherContainer.setAttribute('id','top-weather-container')
              topWeatherContainer.classList.add('flex', 'justify-evenly', 'align-center')

        //ICON
        const { icon } = currentWeather
        const img = document.createElement('img');
              img.setAttribute('src', iconsObject[icon]);
              img.setAttribute('id','weather-icon')

        const bottomWeatherContainer = document.createElement('section')
              bottomWeatherContainer.setAttribute('id','bottom-weather-container')
              bottomWeatherContainer.classList.add('flex', 'justify-center', 'align-center')

        Object.keys(currentWeather).forEach(el => {
          //WEATHER DATA CONTAINER
          let dataContainer = document.createElement('article');
              dataContainer.classList.add('weather-data', 'flex', 'justify-between', 'align-center', 'flex-auto');

          //Title
          let dataTitle = document.createElement('span');
              dataTitle.classList.add('data-title', 'flex-auto');

          //value
          let dataValue = document.createElement('p');
              dataValue.classList.add('data-value','flex','flex-auto', 'justify-center', 'align-center');

          switch(el){

            case 'icon':
              break;

            case 'nearestStormBearing':
              break;

            case 'windBearing':

              dataTitle.textContent = 'wind bearing';
              dataValue.textContent = determineBearing(currentWeather[el])
              dataContainer.appendChild(dataTitle);
              dataContainer.appendChild(dataValue);
              bottomWeatherContainer.appendChild(dataContainer);
              break;

            case 'temperature':

              dataTitle.textContent = 'temperature';
              dataValue.innerHTML = `${forecast.currently[el]} &#8457;`;
              dataContainer.appendChild(dataTitle);
              dataContainer.appendChild(dataValue);
              bottomWeatherContainer.appendChild(dataContainer);
              break;

            case 'nearestStormDistance':

              const stormBearing = determineBearing(currentWeather['nearestStormBearing']);
              dataTitle.textContent = 'nearest storm'
              dataValue.textContent = `${currentWeather[el]} miles ${stormBearing}`
              dataContainer.appendChild(dataTitle);
              dataContainer.appendChild(dataValue);
              bottomWeatherContainer.appendChild(dataContainer);
              break;

            case 'time':

              let date = new Date(currentWeather[el] * 1000)
              let slicedDate = date.toString().split(' ').slice(0,4).join(' ')
              dataTitle.textContent = `${el}`
              dataValue.textContent =`${slicedDate}`
              dataContainer.appendChild(dataTitle);
              dataContainer.appendChild(dataValue);
              bottomWeatherContainer.appendChild(dataContainer);
              break;

            case 'precipProbability':

              dataTitle.textContent = 'Chance of Rain'
              dataValue.textContent = `${currentWeather[el]} %`
              dataContainer.appendChild(dataTitle);
              dataContainer.appendChild(dataValue);
              bottomWeatherContainer.appendChild(dataContainer);
              break;

            case 'apparentTemperature':

              dataTitle.textContent = 'Feels Like: ';
              dataValue.innerHTML = `${forecast.currently[el]} &#8457;`;
              dataContainer.appendChild(dataTitle);
              dataContainer.appendChild(dataValue);
              bottomWeatherContainer.appendChild(dataContainer);
              break;

            default:

              dataTitle.textContent = `${el}`
              dataValue.textContent = `${forecast.currently[el]}`;
              dataContainer.appendChild(dataTitle);
              dataContainer.appendChild(dataValue);
              bottomWeatherContainer.appendChild(dataContainer);
          }

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
