import { FETCH_SHOWS_START, FETCH_SHOWS_SUCCESS } from "../actions/shows.js";

const initialState = {
    isFetchingShows: false,
    searchShows: []
};

export default function shows(state = initialState, action) {
    switch (action.type) {
        case FETCH_SHOWS_START:
            return { ...state, isFetchingShows: true };
        case FETCH_SHOWS_SUCCESS:
            return { ...state, isFetchingShows: false, searchShows: action.showsData };
        default: 
            return state;
    }
}