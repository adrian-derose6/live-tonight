import React, { Component } from 'react';

import './App.css';
import SearchAppBar from './components/SearchAppBar/index.js';
import MapDashboard from './components/MapDashboard';

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
      <div className="App">
        <SearchAppBar />
        <div>
          <MapDashboard windowHeight={height} windowWidth={width} />
        </div>
      </div>
    );
  }
}

export default App;
