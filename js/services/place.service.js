import { util } from './util.js'
import { storageService } from './async-storage.service.js'
import { mapService } from './map.service.js'

export const placeService = {
    createPlace,
    query
}

const LOC_KEY = 'locB'

let gPlaceId = 1000
let gCurrLocsList



_createLocs()

export const locService = {
    query,
    get,
    remove,
    save,
}

function query() {
    return storageService.query(LOC_KEY)
        .then(locs => {
            return locs
        })
}

function get(locId) {
    return storageService.get(LOC_KEY, locId)
}

function remove(locId) {
    return storageService.remove(LOC_KEY, locId)
}

function save(loc) {
    if (loc.id) {
        return storageService.put(LOC_KEY, loc)
    } else {
        return storageService.post(LOC_KEY, loc)
    }
}

function _createLocs() {
    storageService.query(LOC_KEY)
        .then(res => {
            if (!res || !res.length) {
                _createDemoLocs()
            }
        })
}


function _createDemoLocs() {
    const names = ['Home', 'Work', 'School']
    const lats = [31.9885368, 25, 35]
    const lngs = [34.8056527, 22, 27]
    const locs = []
    for (let i = 0; i < 3; i++) {
        const loc = createPlace(names[i], lats[i], lngs[i], false)
        locs.push(loc)
        const lat = lats[i]
        const lng = lngs[i]
    }
    storageService.post(LOC_KEY, locs)
}

function createPlace(name, lat, lng, isRealLoc) {
    const loc = {
        id: gPlaceId++,
        name,
        lat,
        lng,
        createdAt: util.createFormatedDate(Date.now()),
        updatedAt: util.createFormatedDate(Date.now())
    }

    if (isRealLoc) {
        query()
            .then(res => {
                gCurrLocsList = res
                gCurrLocsList.push(loc)
                storageService.post(LOC_KEY, gCurrLocsList)
            })
    }
    return loc
}

function getSavedLocs() {
    query().then((res) => {
        return res
    })
}