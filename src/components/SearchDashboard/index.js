// React & Redux Packages
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material-UI Packages
import { AppBar, Toolbar, IconButton, Typography, Button, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// Child Components
import ShowsIndex from '../ShowsIndex/index.js';
import SearchMap from '../Map/index.js';
import LocationSearchInput from './LocationSearchInput.js';

// Redux Actions
import { setSearchLocation } from '../../actions/location.js';
import { fetchShowsByCriteria } from '../../actions/shows.js';


class SearchDashboard extends Component {
    componentDidUpdate(prevProps) {
        const { center, name } = this.props.searchLocation;

        if (prevProps.searchLocation !== this.props.searchLocation) {
            console.log(name, center);
        }
	}
	
	componentDidMount() {
		if (navigator && navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(pos => {
				const coords = pos.coords;
				this.onLocationChange({
					location: {
						lat: coords.latitude,
						lng: coords.longitude
					}
				});
			});
		}
	} 


    onLocationChange = (geocoderRequest) => {
        this.props.setSearchLocation(geocoderRequest);
    }

    render() {
        const { classes, searchLocation, windowHeight } = this.props;

        return (
            <div className={classes.root} >
                <AppBar className={classes.criteriaBar} position='relative' >
                    <Toolbar style={{ maxWidth: '100%', justifyContent: 'flex-start', alignItems: 'center'}}>
                        <LocationSearchInput onLocationChange={this.onLocationChange} />
                        <Button className={classes.criteriaButton} size="small" disableRipple disableFocusRipple style={{ marginLeft: 30 }}>
                            Genre
                        </Button>
                        <Button className={classes.criteriaButton} size="small" disableRipple disableFocusRipple>
                            Popularity
                        </Button>
                        <Button className={classes.criteriaButton} size="small" disableRipple disableFocusRipple>
                            Criteria 3
                        </Button>
                    </Toolbar>
                </AppBar>
                <div style={{ height: windowHeight - 134 }}>
                    <Grid
                        container
                        zeroMinWidth
                        style={{ height: '100%', width: '100%' }}
                    >
                        <Grid item md={5} >
                            <div className={classes.mapContainer}>
                                <SearchMap center={searchLocation.center} />
                            </div>
                        </Grid>
                        <Grid item md={7} className={classes.rightPanel}>

                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

// Custom Material-UI Styles
const styles = theme => ({
    root: {
       flexGrow: 1
    },
    criteriaBar: {
        maxWidth: '100%',
        height: '55px',
        backgroundColor: 'white',
        boxShadow: 'none',
        borderBottom: '1px lightgray solid',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    criteriaButton: {
        width: 109,
        border: '2px #2B1935 solid',
        color: '#2B1935',
        marginRight: 15,
        borderRadius: 0,
        fontFamily: "Sharp Sans No1 Semibold",
        textTransform: 'none',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover': {
            color: 'white',
            backgroundColor: '#2B1935'
        }
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
        borderLeft: '1px lightgray solid',
        boxShadow: '-2px 0px 3px 0px rgba(168,163,168,1)',
    },
    mapContainer: {
        width: '100%', 
        height: '100%',
        position: 'relative'
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
        fetchShowsByCriteria: (criteria) => dispatch(fetchShowsByCriteria(criteria)),
        setSearchLocation: (geocoderRequest) => dispatch(setSearchLocation(geocoderRequest))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(SearchDashboard));

