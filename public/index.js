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

      //icon dictionary for response object
      const iconsObject = {
        'clear-day': './svg/clear-day.svg',
        'clear-night': './svg/clear-night.svg',
        'rain' : './svg/rain.svg',
        'snow' : './svg/snow.svg',
        'sleet' : './svg/sleet.svg',
        'wind' : './svg/wind.svg',
        'fog': './svg/cloudy.svg',
        'cloudy': './svg/cloudy.svg',
        'partly-cloudy-day': './svg/partly-cloudy-day.svg',
        'partly-cloudy-night': './svg/partly-cloudy-night.svg',
        'hail': './svg/hail.svg',
        'thunderstorm' : './svg/thunderstorm.svg',
        'tornado' : './svg/tornado.svg'
      }

      //enter compass reading to get wind bearing
      const determineBearing =(bearing)=> {
        const b = bearing;
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
        console.log('-currweather--> ' , forecast)

        //TOP PORTION WITH CURRENT WEATHER INFO
        const topWeatherContainer = document.createElement('section')
              topWeatherContainer.setAttribute('id','top-weather-container')
              topWeatherContainer.classList.add('flex', 'justify-evenly', 'align-center', 'column')

        //ICON


        const { summary } = currentWeather

        const iconSummaryEl = document.createElement('section');
              iconSummaryEl.setAttribute('id', 'icon-summary-container')

        const { icon } = currentWeather
        const weatherIconEl = document.createElement('img');
              weatherIconEl.setAttribute('src', iconsObject[icon]);
              weatherIconEl.setAttribute('id','weather-icon')


        const summaryEl = document.createElement('h3');
        summaryEl.textContent = summary;

        iconSummaryEl.appendChild(weatherIconEl)
        iconSummaryEl.appendChild(summaryEl)



        //TIME TEMPERATURE
        const temperatureEl = document.createElement('article');
              temperatureEl.setAttribute('id', 'temperature-container')
        const { temperature, apparentTemperature: feelsLike, time } = currentWeather;

        const humanReadableDate = new Date(time*1000).toDateString();
        const humanReadableTime = new Date(time*1000).toTimeString();

        const timeSplit = humanReadableTime.split(' ')
        console.log(timeSplit)

          const dateEl = document.createElement('time');
                dateEl.setAttribute('id', 'date');
                dateEl.setAttribute('datetime', time);
                dateEl.textContent = humanReadableDate;

          const timeEl = document.createElement('time');
                timeEl.setAttribute('id', 'time');
                timeEl.setAttribute('dateTime', time);
                timeEl.textContent = `${timeSplit[0]} ${timeSplit[2]}`;

          const realTempEl = document.createElement('data');
                realTempEl.setAttribute('id', 'real-temp');
                realTempEl.setAttribute('value', `The current temperature is ${temperature} degrees.`);
                realTempEl.innerHTML = `${temperature}&#8457;`;

          const feelsLikeEl = document.createElement('data')
                feelsLikeEl.setAttribute('id', 'feels-like-temp');
                feelsLikeEl.setAttribute('value', `The temperature currently feels like ${feelsLike} degrees.`)
                feelsLikeEl.textContent = `Feels Like: ${feelsLike}`;

        temperatureEl.appendChild(dateEl)
        temperatureEl.appendChild(timeEl);
        temperatureEl.appendChild(realTempEl);
        temperatureEl.appendChild(feelsLikeEl)


        //DETAILS
          //Time
          //Summary
          //Nearest Storm
          //Chance of Rain



        //NAVBAR
        const navbar = document.createElement('nav');
        navbar.classList.add('navbar','flex', 'flex-auto');

        //add NOW,60, 24, 7, SEARCH
        const navButtons = ['now',':60','24hr', '7-day', 'Search'];
        navButtons.forEach(el => {
          let navButton = document.createElement('div');
          navButton.textContent = el;
          navButton.classList.add('flex-center','nav-button')
          navButton.addEventListener('click', (evt)=> {
            // console.log(evt);
          })
          navbar.appendChild(navButton);
        })




        topWeatherContainer.appendChild(iconSummaryEl);
        topWeatherContainer.appendChild(temperatureEl);
        topWeatherContainer.appendChild(navbar);










        const bottomWeatherContainer = document.createElement('section')
              bottomWeatherContainer.setAttribute('id','bottom-weather-container')
              bottomWeatherContainer.classList.add('flex', 'justify-center', 'align-center')







        Object.keys(currentWeather).forEach(el => {
          //WEATHER DATA CONTAINER
          let dataContainer = document.createElement('article');
              dataContainer.classList.add('weather-data', 'flex', 'justify-between', 'align-center');
              // flex-auto

          //Title
          let dataTitle = document.createElement('span');
              dataTitle.classList.add('data-title', 'flex-auto');

          // let summary = document.createElement('summary');
          // let description = document.createElement('p')

          //value
          let dataValue = document.createElement('p');
              dataValue.classList.add('data-value','flex','flex-auto', 'justify-center', 'align-center');

          const appendChildren=(child1, child2, parent, grandparent)=> {
            parent.appendChild(child1)
            parent.appendChild(child2)
            grandparent.appendChild(parent)
          }

          switch(el){

            case 'icon':
              break;

            case 'time':
              break;

            case 'nearestStormBearing':
              break;

            case 'windBearing':

              // summary.textContent = 'Wind Bearing'
              // description.textContent = 'The direction that the wind is coming from'

              // dataTitle.appendChild(summary);
              // dataTitle.appendChild(description);

              dataTitle.textContent = 'wind bearing';
              dataValue.textContent = determineBearing(currentWeather[el]);
              appendChildren(dataTitle,dataValue, dataContainer,bottomWeatherContainer);
              // dataContainer.appendChild(dataTitle);
              // dataContainer.appendChild(dataValue);
              // bottomWeatherContainer.appendChild(dataContainer);
              break;

            case 'temperature':

              dataTitle.textContent = 'temperature';
              dataValue.innerHTML = `${forecast.currently[el]} &#8457;`;
              appendChildren(dataTitle,dataValue, dataContainer,bottomWeatherContainer);
              break;

            case 'nearestStormDistance':

              const stormBearing = determineBearing(currentWeather['nearestStormBearing']);
              dataTitle.textContent = 'nearest storm'
              dataValue.textContent = `${currentWeather[el]} miles ${stormBearing}`
              appendChildren(dataTitle,dataValue, dataContainer,bottomWeatherContainer);
              break;

            case 'precipProbability':

              dataTitle.textContent = 'Chance of Rain'
              dataValue.textContent = `${currentWeather[el]} %`
              appendChildren(dataTitle,dataValue, dataContainer,bottomWeatherContainer);
              break;

            case 'apparentTemperature':

              dataTitle.textContent = 'Feels Like: ';
              dataValue.innerHTML = `${forecast.currently[el]} &#8457;`;
              appendChildren(dataTitle, dataValue, dataContainer, bottomWeatherContainer);
              break;

            default:

              dataTitle.textContent = `${el}`
              dataValue.textContent = `${forecast.currently[el]}`;
              appendChildren(dataTitle,dataValue, dataContainer,bottomWeatherContainer);
          }

        })


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
