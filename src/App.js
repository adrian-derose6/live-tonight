// React and Redux packages
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Child components
import TopAppBar from './components/TopAppBar/index.js';
import SearchDashboard from './components/SearchDashboard/index.js';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
    
    render() {
        const { width, height } = this.state;
        return (
            <div style={{ height: '100%' }}>
                <TopAppBar />
                <div>
                    <SearchDashboard windowHeight={height} windowWidth={width} />
                </div>
            </div>
        );
    }
}

export default App;
