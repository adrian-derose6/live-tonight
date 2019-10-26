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

        geocoder.geocode(geocoderRequest, async (results, status) => {
            if (status === 'OK') {
				let preciseLocation = (results.length > 1) ? results.filter((result) => {
					return (result.address_components.length === 4 || result.address_components.length === 5) && result.types.includes('postal_code')
                }) : results;
                
                const center = {
                    lat: preciseLocation[0].geometry.location.lat(),
                    lng: preciseLocation[0].geometry.location.lng()
                }

                let polygonCoords = (!geocoderRequest.location) ? await getPolygonCoordinates(geocoderRequest.address) : [];

				let locationData = {
					name: preciseLocation[0].formatted_address,
					center: center,
					viewport: [
                        {
                            lat: preciseLocation[0].geometry.viewport.getNorthEast().lat(),
                            lng: preciseLocation[0].geometry.viewport.getNorthEast().lng()
                        },
                        {
                            lat: preciseLocation[0].geometry.viewport.getSouthWest().lat(),
                            lng: preciseLocation[0].geometry.viewport.getSouthWest().lng()
                        }
                    ],
                    polygonCoords: polygonCoords || []
				}

              	dispatch(fetchGeocodeSuccess(locationData));
            }
            else {
                dispatch(fetchGeocodeFailure(status));
            }
        })
    }
}

async function getPolygonCoordinates(address) {
    const rawMapData = await fetch(`https://nominatim.openstreetmap.org/search?q=${address}&polygon_geojson=1&format=json`)
    const locationData = await rawMapData.json();
    if (locationData.length > 0) {
        const geoJSON = locationData[0].geojson;
        console.log(geoJSON);
        if (geoJSON.type === "Polygon") {
            return geoJSON.coordinates.map(group => {
                return group.map(coord => {
                    return {
                        lat: coord[1],
                        lng: coord[0]
                    }
                });
            })
        }
        else if (geoJSON.type === 'MultiPolygon') {
            return geoJSON.coordinates.map(group => {
                let flattened = flatten(group)    
                return flattened.map(coord => {
                    return {
                        lat: coord[1],
                        lng: coord[0]
                    }
                })

            })
        }
    }
    else { return []; }
    
}

function flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
      return flat.concat(toFlatten);
    }, []);
}