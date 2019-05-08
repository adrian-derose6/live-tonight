import React, { Component } from 'react';

import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import ShowsIndex from '../ShowsIndex/index.js';
import ShowsMap from '../Map/index.js';
import './styles.css';

import { fetchShowsByCriteria } from '../../actions/shows.js';

class MapDashboard extends Component {
    componentDidMount() {
        this.props.fetchShowsByCriteria();
    }

    render() {
        const { windowWidth, windowHeight } = this.props;
        const { classes, locationName } = this.props;
        return (
            <div className={classes.root} style={{ height: windowHeight - 65 }}>
                <Grid
                    container
                    zeroMinWidth
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                    className={classes.grid}
                >
                    <Grid item md={8} className={classes.rightPanel}>
                        <ShowsIndex location={locationName}/>    
                    </Grid>
                    <Grid item md={4} className={classes.leftPanel}>
                        <Grid
                            container
                            zeroMinWidth
                            direction="column"
                            justify='flex-start'
                            className={classes.leftGrid}
                        >
                            <Grid item md={12} className={classes.mapContainer}>
                                <ShowsMap 
                                    isMarkerShown
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const styles = theme => ({
    root: {
       flexGrow: 1,
    },
    grid: {
        height: '100%',
        width: '100%',
    },
    leftPanel: {
       height: '100%',
    },
    rightPanel: {
        height: '100%',
        boxShadow: '-1px 0px 2px -1px rgba(135,119,135,1)',
        zIndex: 2000
    },
    leftGrid: {
        height: '100%',
        minWidth: '100%',
    },
    mapContainer: {
        minWidth: '100%',
    },
    playlistContainer: {
        minWidth: '100%',
        height: '100%',
        boxShadow: '-1px -1px 2px -1px rgba(135,119,135,1)',
        zIndex: 2010         
    }
});

const mapStateToProps = (state) => {
    return {
      shows: state.shows,
      locationName: state.location.searchLocation.name
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchShowsByCriteria: (criteria) => dispatch(fetchShowsByCriteria(criteria))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(MapDashboard));

