export const SET_SEARCH_LOCATION = 'SET_SEARCH_LOCATION';
export function setSearchLocation(searchLocation) {
    return {
        type: SET_SEARCH_LOCATION,
        searchLocation
    }
}

export const SET_SEARCH_CENTER = 'SET_SEARCH_CENTER';
export function setSearchCenter(centerLatLng) {
    return {
        type: SET_SEARCH_CENTER,
        centerLatLng
    }
}