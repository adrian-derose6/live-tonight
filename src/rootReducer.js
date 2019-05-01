import { combineReducers } from 'redux';

import shows from './reducers/shows.js';

const rootReducer = combineReducers({
    shows
});

export default rootReducer;



