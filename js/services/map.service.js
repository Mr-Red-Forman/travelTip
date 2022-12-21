export const mapService = {
    initMap,
    addMarker,
    panTo
}

// Var that is used throughout this Module (not global)
var gMap
// To-do: add a variable to set place id
let gPlaceId = 1000

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
            // To-do: add a line to start looking for click on map
            gMap.addListener("click", onAddPlace)
            console.log('Map!', gMap)
            google.maps.event.addDomListener(window, "resize", function() {
            var center = gMap.getCenter();
            google.maps.event.trigger(gMap, "resize");
            gMap.setCenter(center); 
            });
        })
}

// To-do: create this func to save place that user click on it in map
function onAddPlace(ev) {
    const loc = {
        id: gPlaceId++,
        name: prompt('enter place name'),
        lat: ev.latLng.lat(),
        lng: ev.latLng.lng(),
        createdAt: createFormatedDate(Date.now()),
        updatedAt: createFormatedDate(Date.now())
    }
    addPlace(loc)
    renderPlaceList()
    renderMarkers(gMap)
}

// To-do: funct that return a normal date pattern
function createFormatedDate(date) {
    const formatedDate = new Intl.DateTimeFormat('en').format(date)
    const options = {
        hour: '2-digit',
        minute: '2-digit'
    }
    const formatedTime = new Intl.DateTimeFormat('he', options).format(date)
    return formatedDate + ', ' + formatedTime
}

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
    const API_KEY = 'AIzaSyAL7cxv_dpFekLBBNomHJhgqCo4RkLjmCQ' //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}