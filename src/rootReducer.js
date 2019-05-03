import { combineReducers } from 'redux';

import shows from './reducers/shows.js';
import location from './reducers/location.js';

const rootReducer = combineReducers({
    shows,
    location
});

export default rootReducer;



