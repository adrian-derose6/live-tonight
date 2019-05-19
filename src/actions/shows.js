export const FETCH_SHOWS_START = 'FETCH_SHOWS_START';
export function fetchShowsStart() {
    return {
        type: FETCH_SHOWS_START,
    }
}

export const FETCH_SHOWS_SUCCESS = 'FETCH_SHOWS_SUCCESS';
export function fetchShowsSuccess(data) {
    return {
        type: FETCH_SHOWS_SUCCESS,
        data
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

    return async (dispatch) => {
        const { geo } = criteria;
        const accessToken = await loadSpotifyAccessToken();
        console.log(accessToken)
        
        dispatch(fetchShowsStart());
        loadShowsJson(geo)
            .then(showsData => mapDataToState(showsData))
            .then(stateData => dispatch(fetchShowsSuccess(stateData)))
            /*.then(reducedData => Promise.all(reducedData.map(async (show) => {
                let artistImg = (show.artistName) ? await loadArtistImage(show.artistName, accessToken) : null;
                return { ...show, artistImg };
            })))
            .then(showsDataWithImg => dispatch(fetchShowsSuccess(showsDataWithImg)))  */
    }
}


//Helper Functions

function loadShowsJson(latLng) {
    const { lat, lng } = latLng;
    return fetch(`https://api.seatgeek.com/2/events?client_id=MTY2OTY2NDh8MTU1ODI3MDExMC4yMQ&lat=${lat}&lon=${lng}&range=12mi&sort=score.desc&type=concert&type=music_festival`)
    .then(res => res.json())
}

function mapDataToState(showsData) {
    const { events } = showsData;
    return events.map((event, index) => {
        const { venue, performers, stats } = event;
        return {
            eventName: venue.short_title,
            artistName: performers[0].name,
            artistImg: performers[0].image,
            venue: venue.name,
            location: { lat: venue.location.lat, lng: venue.location.lon },
            displayLocation: venue.display_location,
            address: venue.address,
            city: venue.state,
            state: venue.city,
            postalCode: venue.postal_code,
            date: null,
            time: null,
            datetime: event.datetime_utc,
            price: stats.average_price,
            id: event.id
        }
    })
}

function loadSpotifyAccessToken() {
    return fetch('http://localhost:4000/spotify-credentials')
            .then(res => res.json())
            .then(accessTokenObj => accessTokenObj.access_token)
            .catch(err => console.log(err))
}


function loadArtistImage(artistName, accessToken) {
    return fetch(`https://api.spotify.com/v1/search?q=${artistName}&type=artist&market=US&limit=10&offset=0`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                    "Accept": "application/json"
                }
            })
            .then(res => res.json())
            .then(artistsData => {
                const { items } = artistsData.artists;
                console.log(artistName, items)
                if (items.length > 0) {
                    const artistMatched = items.filter((item) => {
                        return (item.name) ? item.name.toLowerCase() === artistName.toLowerCase() : null
                    });
                    
                    if (artistMatched.length > 0 && artistMatched[0].images.length > 0) {
                        return artistMatched[0].images[0].url;
                    }
                }
                else return null;
            })
            
}