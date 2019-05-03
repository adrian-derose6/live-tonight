import { FETCH_SHOWS_REQUEST } from "../actions/shows.js";

const initialState = {
    isFetchingShows: false,
    shows: {}
};

export default function shows(state = initialState, action) {
    switch (action.type) {
        case (FETCH_SHOWS_REQUEST):
            return { ...state, isFetchingShows: true };
        default: 
            return state;
    }
}