import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';
import { geolocated } from 'react-geolocated';
import { setSearchLocation, setSearchCenter } from '../../actions/location.js';
import MapMarker from './MapMarker.js';
import DetailBubble from './ShowDetailBubble.js';
import SearchButton from './SearchButton.js';

const showLocations = [
  {
    lat: 41.88,
    lng: -87.63
  },
  {
    lat: 41.87,
    lng: -87.62
  }
]

function createMapOptions() {
  const google = window.google;

  return {
    panControl: false,
    mapTypeControl: false,
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_BOTTOM
    },
    fullscreenControl: false,
    scrollwheel: false
  }
}


class ShowsMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailBubbleAnchorEl: null,
      detailBubbleLatLng: null,
      detailBubbleInfo: {},
      currentCenter: null,
      scrolledAway: false,
      currentZoom: null,
    }
  }

  static defaultProps = {
    zoom: 13,
    center: {
      lat: 41.8781,
      lng: -87.6298
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.coords !== this.props.coords) {
      const { latitude, longitude } = this.props.coords;

      this.props.setSearchLocation({ location: { lat: latitude, lng: longitude }});
    }

    if (prevProps.searchShows !== this.props.searchShows){
      this.setBounds(this.props.searchShows);
    }
  }

  setBounds(showsList) {
    const google = window.google;
    const bounds = new google.maps.LatLngBounds();

    if (showsList.length > 0 && showsList.length !== 1) {
      showsList.forEach(show => {
        const { location } = show;
        bounds.extend(new google.maps.LatLng(location.lat, location.lng));
      })

      const newBounds = {
        ne: {
            lat: bounds.getNorthEast().lat(),
            lng: bounds.getNorthEast().lng()
        },
        sw: {
            lat: bounds.getSouthWest().lat(),
            lng: bounds.getSouthWest().lng()
        }
      };

      const { zoom } = fitBounds(newBounds, { width: 400, height: 600});
      
      this.setState({
        currentZoom: zoom,
        currentCenter: this.props.searchLocation.center
      })
    }
    else if (showsList.length <= 1) {
      this.setState({ currentZoom: 13, currentCenter: this.props.searchLocation.center })
    }
  }

  handleDetailClose = () => {
    this.setState({
      detailBubbleAnchorEl: null
    });
  }
  
  handleMarkerClick = (event, show) => {
    this.setState({
      detailBubbleAnchorEl: event.currentTarget,
      currentCenter: { lat: show.location.lat, lng: show.location.lng },
      detailBubbleLatLng: { lat: show.location.lat, lng: show.location.lng },
      detailBubbleInfo: show
    });
    
  }

  handleButtonSearch = () => {
    this.setState({ scrolledAway: false, currentCenter: null })
  }

  handleDrag = () => {
    if (!this.state.scrolledAway) {
      this.setState({ scrolledAway: true });
    }
  }

  setCurrentCenter = (center) => {
    this.setState({ currentCenter: center })
  }

  renderMap = () => {
    const { detailBubbleAnchorEl } = this.state;
    const detailOpen = Boolean(detailBubbleAnchorEl);
    const { currentCenter } = this.state;
    console.log(this.state)
    return (
      <GoogleMapReact
        yesIWantToUseGoogleMapApiInternals
        bootstrapURLKeys={{ key: 'AIzaSyC-mITYSots24MEoNzoPew533UKmVOga8Y' }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        center={currentCenter}
        zoom={this.state.currentZoom - 1}
        onChange={({ center }) => this.setCurrentCenter(center)}
        onDrag={() => this.handleDrag()}
        options={createMapOptions}
      >
        {
          this.props.searchShows.map((show, index) => {
            const { lat, lng } = show.location;
           
            return (
              <div lat={lat} lng={lng} key={index}>
                <MapMarker onClick={(event) => this.handleMarkerClick(event, show)}  />
              </div>
            )
          })
        }
        {
          (this.state.detailBubbleLatLng) ? 
            <DetailBubble 
              id="event"
              open={detailOpen}
              anchorEl={detailBubbleAnchorEl}
              onClose={this.handleDetailClose}
              lat={this.state.detailBubbleLatLng.lat}
              lng={this.state.detailBubbleLatLng.lng}
              detailBubbleInfo={this.state.detailBubbleInfo}
            />
            : null
        }
      </GoogleMapReact>   
    )
  }

  render() {
    return (
      <div style={{ width: '100%', height: '100%', position: 'relative'}}>
        <SearchButton toSearch={this.state.scrolledAway} onClick={this.handleButtonSearch} />
        {this.renderMap()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchLocation: state.location.searchLocation,
    isLoading: state.location.isLoading,
    searchShows: state.shows.searchShows
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setSearchLocation: (geocoderRequest) => dispatch(setSearchLocation(geocoderRequest)),
    setSearchCenter: (centerLatLng) => dispatch(setSearchCenter(centerLatLng))
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(geolocated({
    positionOptions: {
      enableHighAccuracy: true
    },
    geolocationProvider: navigator.geolocation
  })(ShowsMap));
