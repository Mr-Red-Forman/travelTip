export const storageService = {
    post,   // Create
    get,    // Read
    put,    // Update
    remove, // Delete
    query,  // List 
}

// ***give you the full list of locations in local storage*** //
function query(entityType, delay = 500) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    return new Promise(resolve => setTimeout(() => resolve(entities), delay))
}

// ***give you a specific item by id from the list in local storage*** //
function get(entityType, entityId) {
    return query(entityType).then(entities => {
        const entity = entities.find(entity => entity.id === entityId)
        // if (!entity) return Promise.reject(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        if (!entity) throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        return entity
    })
}

// ***create a new list in local storage*** //
function post(entityType, newEntity) {
    newEntity = JSON.parse(JSON.stringify(newEntity))
    return query(entityType).then(entities => {
        entities.push(newEntity)
        _save(entityType, newEntity)
        return newEntity
    })
}

// ***update a specific item by id from the list in local storage*** //
function put(entityType, updatedEntity) {
    updatedEntity = JSON.parse(JSON.stringify(updatedEntity))
    return query(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity.id === updatedEntity.id)
        if (idx < 0) throw new Error(`Update failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        entities.splice(idx, 1, updatedEntity)
        _save(entityType, entities)
        return updatedEntity
    })
}

// ***remove a specific item by id from the list in local storage*** //
function remove(entityType, entityId) {
    return query(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity.id === entityId)
        if (idx < 0) throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        entities.splice(idx, 1)
        _save(entityType, entities)
    })
}

// Private functions
function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}