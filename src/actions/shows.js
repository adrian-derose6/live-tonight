export const SET_GENRE = 'SET_GENRE';
export function setGenre(genre) {
    return {
        type: SET_GENRE,
        data: genre
    }
}

export const SET_RANGE = 'SET_RANGE';
export function setRange(range) {
    return {
        type: SET_RANGE,
        data: range
    }
}

export const FETCH_SHOWS_START = 'FETCH_SHOWS_START';
function fetchShowsStart() {
    return {
        type: FETCH_SHOWS_START
    }
}

export const FETCH_SHOWS_SUCCESS = 'FETCH_SHOWS_SUCCESS';
function fetchShowsSuccess(showsData) {
    return {
        type: FETCH_SHOWS_SUCCESS,
        data: showsData
    }
}

export const FETCH_SHOWS_FAILURE = 'FETCH_SHOWS_FAILURE';
function fetchShowsFailure(error) {
    return {
        type: FETCH_SHOWS_FAILURE,
        data: error
    }
}

export function fetchShowsByCriteria(criteria = {}) {

    return async (dispatch) => {
        const accessToken = await loadSpotifyAccessToken();

        dispatch(fetchShowsStart());

        const showsData = await loadShowsJSON(criteria);
        const storeData = await mapDataToStore(showsData.events);
        const storeDataWithImg = await Promise.all(storeData.map(async (show) => {
            let artistImg = (show.artistName) ? await loadArtistImage(show.artistName, accessToken) : null;
            return { ...show, artistImg };
        }));
        
        dispatch(fetchShowsSuccess(storeDataWithImg));
    }
}


//Helper Functions

async function loadShowsJSON(criteria) {
    const { lat, lng } = criteria.searchLocation;
    const { genre, range } = criteria;

    const locationQueryString = `lat=${lat}&lon=${lng}`;
    const genreQueryString = (genre.length > 0) ? `genres.slug=${genre}` : '';
    const rangeQueryString = (range) ? `range=${range}mi` : 'range=15mi'

    return await fetch(`https://api.seatgeek.com/2/events?per_page=30&${locationQueryString}&${genreQueryString}&${rangeQueryString}&type=concert&client_id=MTY2OTY2NDh8MTU3MTgwOTA1Ny41`)
    .then(res => res.json())
}

function mapDataToStore(showsData) {
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