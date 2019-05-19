import { FETCH_SHOWS_START, FETCH_SHOWS_SUCCESS, FETCH_SHOWS_FAILURE } from "../actions/shows.js";

const initialState = {
    isFetchingShows: false,
    searchShows: [{
        eventName: null,
        artistName: null,
        artistImg: null,
        venue: null,
        location: { lat: null, lng: null },
        displayLocation: null,
        address: null,
        city: null,
        state: null,
        postalCode: null,
        date: null,
        time: null,
        datetime: null,
        price: null
    }]
};

export default function shows(state = initialState, action) {
    switch (action.type) {
        case FETCH_SHOWS_START:
            return { ...state, isFetchingShows: true };
        case FETCH_SHOWS_SUCCESS:
            return { ...state, isFetchingShows: false, searchShows: action.data };
        case FETCH_SHOWS_FAILURE:
            return { ...state, isFetchingShows: false, error: action.error };
        default: 
            return state;
    }
}