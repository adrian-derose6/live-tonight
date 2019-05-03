export const FETCH_SHOWS_REQUEST = 'FETCH_SHOWS_REQUEST';
export function fetchShowsRequest(criteria) {
    return {
        type: FETCH_SHOWS_REQUEST,
        criteria
    }
}

export const FETCH_SHOWS_SUCCESS = 'FETCH_SHOWS_SUCCESS';
export function fetchShowsSuccess(response) {
    return {
        type: FETCH_SHOWS_SUCCESS,
        response
    }
}

export const FETCH_SHOWS_FAILURE = 'FETCH_SHOWS_FAILURE';
export function fetchShowsFailure(error) {
    return {
        type: FETCH_SHOWS_FAILURE,
        error
    }
}

export function fetchShowsByCriteria(criteria = {}) {

    return function() {
        return fetch('https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=324&apikey=A1MHHvkVP5iP4j6hKLc6kHasNqGJeMcN')
               .then(res => console.log(res.json()))
    }  
}

//Helper Functions 
