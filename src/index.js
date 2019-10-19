// React packages
import React from 'react';
import ReactDOM from 'react-dom';

// Redux packages
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';

// Service Worker
import * as serviceWorker from './serviceWorker';

// Root Reducer
import rootReducer from './rootReducer.js';

// Styles
import './index.css';

// Application Component
import App from './App';

// Create redux store from root reducer and add 'logger' as middleware
const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware(), logger]
});

// Render virtual DOM 
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);


serviceWorker.unregister();
