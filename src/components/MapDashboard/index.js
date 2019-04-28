import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import './styles.css';

class MapDashboard extends Component {
    render() {
        const { windowWidth, windowHeight } = this.props;
        return (
            <div className="main" style={{ height: windowHeight - 65 }}>
                <Grid 
                />
            </div>
        );
    }
}

export default MapDashboard;
