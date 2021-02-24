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
      const { latitude, longitude } = position.coords;
      const iconsObject = {
        'clear-day': '',
        'clear-night': '',
        'rain' : '',
        'snow' : '',
        'sleet' : '',
        'wind' : '',
        'fog': '',
        'cloudy': '',
        'partly-cloudy-day': '',
        'partly-cloudy-night': ''
      }

      try{
        const queryUrl = `/api/weather?lat=${latitude}&lon=${longitude}`;
        const response = await fetch(queryUrl);
        const data = await response.json();
        console.log('fetched data--> ', data)
        } catch(error) {
          console.log('Error fetching weather data')
        }



      //HIDE SPINNER
      loadingSection.style.display = 'none';
      status.textContent = '';


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
