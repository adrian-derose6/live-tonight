import { SET_CURRENT_LOCATION } from '../actions/location.js';

const initialState = {
    currentLocation: {
        lat: 41.8781,
        lng: -87.6298
    }
}

export default function location(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_LOCATION: 
            return { ...state, currentLocation: action.currentLocation }
        default: 
            return state;
    }
}