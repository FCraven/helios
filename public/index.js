'use strict'

window.onload =async ()=> {

  const getWeather =async ()=> {
    const ls = window.localStorage;
      try {
          const success =async (position)=> {
              const { latitude, longitude } = position.coords;
              const queryUrl = `/api/weather?lat=${latitude}&lon=${longitude}`;
              const response = await fetch(queryUrl);
              const data = await response.json();
              localStorage.setItem('forecast', JSON.stringify(data));
              console.log('Fetch data ==-->', data);
            }

          const error =()=> {
              //do something here that makes a nice landing screen and prompts user to search for weather
              //UNABLE TO GET COORDINATES FROM DEVICE

              console.log('Unable to retrieve your location');
            }

          if(!navigator.geolocation) {
            //do somthing here to handle for no geolocation
              console.log('Geolocation is not supported by your browser');
            } else {
                console.log('Locating…');
                await navigator.geolocation.getCurrentPosition(success, error);
            }
      } catch(err) {
          console.log(
              'Could not get coordinates from browser.'
          )
      }
  }

  await getWeather()

}
