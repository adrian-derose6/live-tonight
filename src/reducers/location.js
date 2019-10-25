import { 
    FETCH_GEOCODE_START, 
    FETCH_GEOCODE_SUCCESS, 
    FETCH_GEOCODE_FAILURE, 
    SET_SEARCH_CENTER 
} from '../actions/location.js';

const initialState = {
    loading: false,
    error: null,
    searchLocation: {
        name: 'Chicago',
        center: { 
            lat: 41.8781,
            lng: -87.6298
        },
        viewport: [
            {
                lat: 42.023131,
                lng: -87.523661
            },
            {
                lat: 41.6443349,
                lng: -87.94026689999998
            }
        ],
        polygonCoords: [] 
    }
}

export default function location(state = initialState, action) {
    switch (action.type) {
        case FETCH_GEOCODE_START: 
            return {
                ...state, 
                loading: true
            }
        case FETCH_GEOCODE_SUCCESS:
            return {
                loading: false,
                error: null,
                searchLocation: action.data
            }
        case FETCH_GEOCODE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case SET_SEARCH_CENTER:
            return { 
                ...state, 
                searchLocation: {
                    ...state.searchLocation,
                    name: '',
                    center: action.centerLatLng,
                    viewport: []
                }
            }
        default:
            return state;
    }
}