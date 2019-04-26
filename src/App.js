import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import 'semantic-ui-react';

import './App.css';
import SearchAppBar from './components/SearchAppBar/index.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SearchAppBar />
        <div>
          
        </div>
      </div>
    );
  }
}

export default App;
