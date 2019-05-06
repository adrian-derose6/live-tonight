export const SET_SEARCH_LOCATION = 'SET_SEARCH_LOCATION';

export function setSearchLocation(searchLocation) {
    return {
        type: SET_SEARCH_LOCATION,
        searchLocation
    }
}