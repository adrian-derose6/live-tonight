import { SET_SEARCH_LOCATION } from '../actions/location.js';

const initialState = {
    searchLocation: {
        name: 'Chicago',
        center: { 
            lat: 41.8781,
            lng: -87.6298
        },
        viewport: {
            ne: {
                lat: 42.023131,
                lng: -87.523661
            },
            sw: {
                lat: 41.6443349,
                lng: -87.94026689999998
            }
        }
    }
}

export default function location(state = initialState, action) {
    switch (action.type) {
        case SET_SEARCH_LOCATION: 
            return { ...state, searchLocation: action.searchLocation }
        default: 
            return state;
    }
}