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
            const key = DARK_SKY_API_KEY
            const lat = position.coords.latitude;
            const lon= position.coords.longitude;
            console.log('lat',lat)
            console.log('lon', lon)
            console.log('==============================================')
            console.log('==-key-> ', key)
            console.log('==============================================')

          }

          function error() {
            console.log('Unable to retrieve your location');
          }

        if(!navigator.geolocation) {
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
