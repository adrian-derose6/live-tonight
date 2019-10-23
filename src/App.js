// React and Redux packages
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Child components
import TopAppBar from './components/TopAppBar/index.js';
import SearchDashboard from './components/SearchDashboard/index.js';


class App extends Component {
    constructor(props) {
        super(props);
    } 
    
    render() {
        return (
            <div style={{ height: '100%' }}>
                <TopAppBar />
                <div>
                    <SearchDashboard />
                </div>
            </div>
        );
    }
}

export default App;
