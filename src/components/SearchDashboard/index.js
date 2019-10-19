// React & Redux Packages
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material-UI Packages
import Grid from '@material-ui/core/Grid';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// Child Components
import ShowsIndex from '../ShowsIndex/index.js';
import ShowsMap from '../Map/index.js';
import LocationSearchInput from './LocationSearchInput.js';

// Styles
import './styles.css';

// Redux Actions
import { fetchShowsByCriteria } from '../../actions/shows.js';

class SearchDashboard extends Component {
    componentDidUpdate(prevProps) {
        if (prevProps.searchLocation !== this.props.searchLocation) {
            const showsSearchCriteria = {
                geo: this.props.searchLocation.center
            };

            this.props.fetchShowsByCriteria(showsSearchCriteria);
        }
    }

    render() {
        const { classes, searchLocation, windowHeight } = this.props;

        return (
            <div className={classes.root} >
                <AppBar className={classes.criteriaBar} position='relative' >
                    <Toolbar>
                        <LocationSearchInput />
                    </Toolbar>
                </AppBar>
                <div style={{ height: windowHeight - 134 }}>

                </div>
            </div>
        );
    }
}

// Custom Material-UI Styles
const styles = theme => ({
    root: {
       flexGrow: 1,
       maxHeight: '100%'
    },
    criteriaBar: {
        minWidth: '100%',
        height: '55px',
        backgroundColor: 'white',
        boxShadow: 'none',
        borderBottom: '1px lightgray solid',
        justifyContent: 'center',
        alignItems: 'flex-start'
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
        boxShadow: '1px 0px 2px -1px rgba(135,119,135,1)',
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
      searchShows: state.shows.searchShows,
      searchLocation: state.location.searchLocation
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
)(withStyles(styles)(SearchDashboard));

