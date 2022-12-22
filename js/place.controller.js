import { placeService } from './services/place.service.js'
import { mapService } from './services/map.service.js'
import { storageService } from './services/async-storage.service.js'

export const placeController = {
    onAddPlace,
    renderAll
}

window.onDelete = onDelete
window.onGo = onGo

// To-do: create this func to save place that user click on it in map
function onAddPlace(ev) {
    const newlocName = prompt('enter place name')
    placeService.createPlace(newlocName, ev.latLng.lat(), ev.latLng.lng(), true)
    mapService.addMarker({ lat: ev.latLng.lat(), lng: ev.latLng.lng() }, newlocName)
    renderAll()
}

function renderAll() {
    placeService.query().then(res => {
        renderPlaceList(res)
        console.log('render', res);
        res.map(loc => {
            mapService.addMarker({ lat: loc.lat, lng: loc.lng }, loc.name)
        })
    })
}

function renderPlaceList(locations) {

//     const elTableHeadings = document.querySelector('.thread-container')
//     const headStrHTML =
//         `<tr>\n
//     <th class = "th id"> Id </th>\n
//     <th class = "th name"> Name </th>\n
//     <th class = "th lat"> Lat </th>\n
//     <th class = "th lng"> Lng </th>\n
//     <th class = "th created at"> Created at </th>\n
//     <th class = "th updated at"> updated at </th>\n
//     <th class = "th go-to"> Go </th>\n
//     <th class = "th delete"> Del </th>\n
// </tr>\n`
//     elTableHeadings.innerHTML = headStrHTML

    const elLocations = document.querySelector('.locationTable')
    var strHTML = locations.map(location =>
    //     `<tr>\n
    // <td class = "location-id" >${location.id} </td>\n
    // <td class = "location-name" >${location.name} </td>\n
    // <td class = "location-lat" >${location.lat} </td>\n
    // <td class = "location-lng" >${location.lng} </td>\n
    // <td class = "location-created at" >${location.createdAt} </td>\n
    // <td class = "location-updated at" >${location.updatedAt} </td>\n
    // <td class = "btn btn-go" onclick = "onGo(${location.lat}, ${location.lng})"> 📌 </td>\n
    // <td class = "btn btn-delete" onclick = "onDelete(${location.id})"> ⛔ </td>\n
    // </tr>\n
    // `)
    `<div class="infoRow">
        <div class = "location-name"  >${location.name} </div>\n
        <section class="locationBtn">
            <div class = "btn btn-go" onclick = "onGo(${location.lat}, ${location.lng})"> 📌 </div>\n
            <div class = "btn btn-delete" onclick = "onDelete(${location.id})"> ⛔ </div>\n
        </section>
        <div class="moreInfo">
            <div class = "location-id " >${location.id} </div>\n
            <div class = "location-lat" >${location.lat} </div>\n
            <div class = "location-lng" >${location.lng} </div>\n
            <div class = "location-created at" >${location.createdAt} </div>\n
            <div class = "location-updated at" >${location.updatedAt} </div>\n 
        </div>
    </div>
    `)
    elLocations.innerHTML = strHTML.join('')
    elTableHeadings.innerHTML = headStrHTML
    
}

function onDelete(locationId) {
    storageService.remove('locB', locationId)
        .then(res => renderAll())
}

function onGo(lat, lng) {
    mapService.panTo(lat, lng)
}