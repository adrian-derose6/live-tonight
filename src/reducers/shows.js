import { FETCH_SHOWS_START, FETCH_SHOWS_SUCCESS, SET_GENRE, SET_RANGE } from "../actions/shows.js";

const initialState = {
    isFetchingShows: false,
    searchShows: [],
    searchCriteria: {
        genre: '',
        range: 15,
    }
};

export default function shows(state = initialState, action) {
    switch (action.type) {
        case SET_GENRE:
            return { ...state, searchCriteria: { ...state, genre: action.data }};
        case SET_RANGE:
            return { ...state, searchCriteria: { ...state, range: action.data }};
        case FETCH_SHOWS_START:
            return { ...state, isFetchingShows: true };
        case FETCH_SHOWS_SUCCESS:
            return { ...state, isFetchingShows: false, searchShows: action.data };
        default: 
            return state;
    }
}