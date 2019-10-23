export const FETCH_SHOWS_START = 'FETCH_SHOWS_START';
export function fetchShowsStart() {
    return {
        type: FETCH_SHOWS_START,
    }
}

export const FETCH_SHOWS_SUCCESS = 'FETCH_SHOWS_SUCCESS';
export function fetchShowsSuccess(showsData) {
    return {
        type: FETCH_SHOWS_SUCCESS,
        showsData
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
        loadShowsJson(`https://api.songkick.com/api/3.0/events.json?apikey=OuFRwWs0gv753l2l&location=geo:${41.8781},${-87.6298}`)
            .then(showsData => reduceShowData(showsData.resultsPage))
            .then(reducedData => Promise.all(reducedData.map(async (show) => {
                let artistImg = (show.artistName) ? await loadArtistImage(show.artistName, accessToken) : null;
                return { ...show, artistImg };
            })))
            .then(showsDataWithImg => dispatch(fetchShowsSuccess(showsDataWithImg)))  
    }
}


//Helper Functions

function loadShowsJson(url) {
    return fetch(url)
    .then(res => res.json())
}

function reduceShowData(showsData) {
    const { event } = showsData.results;

    return event.map((show) => {
        const artistName = (show.performance.length >= 1) ? show.performance[0].displayName : null;
        return {
            eventName: show.displayName,
            artistName: artistName,
            artistImg: null,
            venue: show.venue.displayName,
            location: { lat: show.location.lat, lng: show.location.lng },
            city: show.location.city,
            date: show.start.date,
            time: show.start.time,
            price: null
        }
    });
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