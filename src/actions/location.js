export const SET_CURRENT_LOCATION = 'SET_CURRENT_LOCATION';

export function setCurrentLocation(currentLocation) {
    return {
        type: SET_CURRENT_LOCATION,
        currentLocation
    }
}