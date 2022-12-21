export const mapService = {
    initMap,
    addMarker,
    panTo
}



// Var that is used throughout this Module (not global)
var gMap
const API_KEY='AIzaSyDngUH5uVBss_ed5jvIm6K5XzCOPT2A3b8'
// const API_KEY='AIzaSyDlJhhGSEoJSVDmKYlrZQtN1GfHq6XpdQM'

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap')
    return _connectGoogleApi()
        .then(() => {
            console.log('google available')
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', gMap)
        })
}
// get location 
function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    })
    return marker
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng)
    gMap.panTo(laLatLng)
}


function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = '' //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script')
    // elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDnVQtoPjz1sJCgj8BE1oCKG7D3sAMIFP0`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}