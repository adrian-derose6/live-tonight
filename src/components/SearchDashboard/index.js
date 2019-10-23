// React & Redux Packages
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material-UI Packages
import { AppBar, Toolbar, IconButton, Typography, Button, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MusicNoteOutlined from '@material-ui/icons/MusicNoteOutlined';
import People from '@material-ui/icons/People';

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
            let geo = center;
            this.props.fetchShowsByCriteria({ geo });
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
                        <Button className={classes.criteriaButton} style={{ height: 36 }} size="small" disableRipple disableFocusRipple style={{ marginLeft: 29 }}>
                            <MusicNoteOutlined />
                            Genre
                        </Button>
                        <Button className={classes.criteriaButton} style={{ height: 36 }} size="small" disableRipple disableFocusRipple>
                           <People style={{ marginRight: 5 }}/>
                            Clout
                        </Button>
                        <Button className={classes.criteriaButton} style={{ height: 36 }} size="small" disableRipple disableFocusRipple>
                            Criteria 3
                        </Button>
                        <Button className={classes.saveSearchButton} style={{ height: 36 }} size='small' disableRipple disableFocusRipple>
                            Save Search
                        </Button>
                    </Toolbar>
                </AppBar>
                <div style={{ height: 'calc(100vh - 134px)' }}>
                    <Grid
                        container
                        zeroMinWidth
                        style={{ height: '100%', width: '100%' }}
                    >
                        <Grid item lg={5} md={8} xs={0}>
                            <div className={classes.mapContainer}>
                                <SearchMap center={searchLocation.center} bounds={searchLocation.viewport}/>
                            </div>
                        </Grid>
                        <Grid item lg={7} md={4} xs={12} className={classes.rightPanel}>
                            <ShowsIndex location={searchLocation.name} showsList={this.props.searchShows} />
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
       
        justifyContent: 'center',
        alignItems: 'space-between',
        '&:hover': {
            color: 'white',
            backgroundColor: '#2B1935'
        }
    },
    saveSearchButton: {
        width: 109,
        border: '2px #2B1935 solid',
        color: 'white',
        marginRight: 15,
        borderRadius: 0,
        fontFamily: "Sharp Sans No1 Semibold",
        textTransform: 'none',
        backgroundColor: '#2B1935',
        justifyContent: 'center',
        alignItems: 'space-between',
        '&:hover': {
            backgroundColor: '#2B1935',
        }
    },
    leftPanel: {
       height: '100%',
    },
    rightPanel: {
        maxHeight: '100%',
        borderLeft: '1px lightgray solid',
        boxShadow: '-2px 2px 5px 0 rgba(0,0,0,.4)',
		zIndex: 1000
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
        setSearchLocation: (geocoderRequest) => dispatch(setSearchLocation(geocoderRequest)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(SearchDashboard));

