import { placeService } from './services/place.service.js'
import { mapService } from './services/map.service.js'

export const placeController = {
    onAddPlace,
    renderMarkers
}

// To-do: create this func to save place that user click on it in map
function onAddPlace(ev) {
    const newlocName = prompt('enter place name')
    placeService.createPlace(newlocName, ev.latLng.lat(), ev.latLng.lng(), true)
    mapService.addMarker({ lat: ev.latLng.lat(), lng: ev.latLng.lng() }, newlocName)
    renderMarkers()
}

function renderMarkers() {
    placeService.query().then(res => {
        renderPlaceList(locations)
        res.map(loc => {
            mapService.addMarker({ lat: loc.lat, lng: loc.lng }, loc.name)
        })
    })
}

function renderPlaceList(locations) {
    const elLocations = document.querySelector('.locations-container')
    var strHTML = locations.map(location =>
        `<tr>\n
    <td class = "location-name" >${location.id} </td>\n
    <td class = "location-name" >${location.name} </td>\n
    <td class = "location-name" >${location.lat} </td>\n
    <td class = "location-name" >${location.lng} </td>\n
    <td class = "location-name" >${location.createdAt} </td>\n
    <td class = "location-name" >${location.updatedAt} </td>\n
    </tr>\n
    `)
    elLocations.innerHTML = strHTML.join('')
}