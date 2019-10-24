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
        loadShowsJson(`https://api.seatgeek.com/2/events?per_page=30&lat=41.8781&lon=-87.6298&type=concert&genres.slug=pop&client_id=MTY2OTY2NDh8MTU3MTgwOTA1Ny41`)
            .then(showsData => reduceShowData(showsData.events))
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
    console.log(showsData)
    return showsData.map((show) => {
        const eventName= show.short_title;
        const artistName = show.performers[0].short_name;
        const venueName = show.venue.name;
        const address = show.venue.address;
        const city = show.venue.city;
        const postalCode = show.venue.postal_code;
        const state = show.venue.state;
        const country = show.venue.country;
        const location = { lat: show.venue.location.lat, lng: show.venue.location.lon }
        const displayLocation = show.venue.display_location;
        const dateTime = show.venue.datetime_local;

        return {
            eventName: eventName,
            artistName: artistName,
            artistImg: null,
            venue: {
                name: venueName,
                address: address,
                city: city,
                postalCode: postalCode,
                state: state,
                country: country,
                location: location,
                displayLocation: displayLocation,
            },
            dateTime: dateTime,
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