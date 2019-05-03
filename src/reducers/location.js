import { SET_CURRENT_LOCATION } from '../actions/location.js';

const initialState = {
    currentLocation: {
        long: 0,
        lat: 0
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