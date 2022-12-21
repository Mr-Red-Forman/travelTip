import { placeService } from './services/place.service.js'

export const placeController = {
    onAddPlace
}

// To-do: create this func to save place that user click on it in map
function onAddPlace(ev) {
    placeService.createPlace(prompt('enter place name'), ev.latLng.lat(), ev.latLng.lng(), true)
    // renderPlaceList()
    // renderMarkers(gMap)
}

