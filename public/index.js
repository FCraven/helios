'use strict'

window.onload =async ()=> {
    const testHeader = document.createElement('h1')
    const root = document.getElementById('root')

    testHeader.textContent = ' Hello World '
    testHeader.classList.add('test-header')
    root.appendChild(testHeader)



const getWeather =async ()=> {

    try {

        function success(position) {
            const lat = position.coords.latitude;
            const lon= position.coords.longitude;
            console.log('lat',lat)
            console.log('lon', lon)
            fetch(`/api/weather?lat=${lat}&lon=${lon}`)
            .then(res => res.json())
            .then(data => console.log(data))
          }

          function error() {
            //do something here that makes a nice landing screen and prompts user to search for weather
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
