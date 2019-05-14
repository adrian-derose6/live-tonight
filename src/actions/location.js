export const SET_SEARCH_CENTER = 'SET_SEARCH_CENTER';
export function setSearchCenter(centerLatLng) {
    return {
        type: SET_SEARCH_CENTER,
        centerLatLng
    }
}

export const FETCH_GEOCODE_START = 'FETCH_GEOCODE_START';
export function fetchGeocodeStart() {
    return {
        type: FETCH_GEOCODE_START,
    }
}
export const FETCH_GEOCODE_SUCCESS = 'FETCH_GEOCODE_SUCCESS';
export function fetchGeocodeSuccess(locationData) {
    return {
        type: FETCH_GEOCODE_SUCCESS,
        data: locationData
    }
}

export const FETCH_GEOCODE_FAILURE = 'FETCH_GEOCODE_FAILURE';
export function fetchGeocodeFailure(error) {
    console.log(error)
    return {
        type: FETCH_GEOCODE_FAILURE,
        data: {
            error
        }
    }
}

export function setSearchLocation(geocoderRequest) {
    const google = window.google;
    const geocoder = new google.maps.Geocoder();

    return dispatch => {
        dispatch(fetchGeocodeStart());

        geocoder.geocode(geocoderRequest, (results, status) => {
            console.log(results)
            if (status === 'OK') {
              let preciseLocation = (results.length > 1) ? results.filter((result) => {
                return (result.address_components.length === 4 || result.address_components.length === 5) && result.types.includes('postal_code')
              }) : results;

              let locationData = {
                name: preciseLocation[0].formatted_address,
                center: {
                  lat: preciseLocation[0].geometry.location.lat(),
                  lng: preciseLocation[0].geometry.location.lng()
                },
                viewport: {
                  ne: {
                    lat: preciseLocation[0].geometry.viewport.getNorthEast().lat(),
                    lng: preciseLocation[0].geometry.viewport.getNorthEast().lng()
                  },
                  sw: {
                    lat: preciseLocation[0].geometry.viewport.getSouthWest().lat(),
                    lng: preciseLocation[0].geometry.viewport.getSouthWest().lng()
                  }
                }
              }

              dispatch(fetchGeocodeSuccess(locationData));
            }
            else {
              dispatch(fetchGeocodeFailure(status));
            }
        })
    }
}