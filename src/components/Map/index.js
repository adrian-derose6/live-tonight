import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';
import { geolocated } from 'react-geolocated';
import { setSearchLocation, setSearchCenter } from '../../actions/location.js';
import MapMarker from './MapMarker.js';
import DetailBubble from './ShowDetailBubble.js';

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

class ShowsMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      detailBubbleAnchorEl: null,
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
  }

  handleDetailClose = () => {
    this.setState({
      detailBubbleAnchorEl: null
    })
  }
  
  handleMarkerClick = (event, lat, lng) => {
    this.setState({
      detailBubbleAnchorEl: event.currentTarget
    });
    
    this.props.setSearchCenter({ lat, lng })
  }

  renderMap = () => {
    const { detailBubbleAnchorEl } = this.state;
    const detailOpen = Boolean(detailBubbleAnchorEl);
    const { viewport, center } = this.props.searchLocation;
    const { zoom } = fitBounds(viewport, { width: 400, height: 600})
    return (
      <GoogleMapReact
        yesIWantToUseGoogleMapApiInternals
        bootstrapURLKeys={{ key: 'AIzaSyC-mITYSots24MEoNzoPew533UKmVOga8Y' }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        zoom={zoom + 1}
        center={this.props.searchLocation.center}
      >
        {
          showLocations.map((location, index) => {
            const { lat, lng } = location;
            return (
              <div lat={lat} lng={lng} key={index}>
                <MapMarker onClick={(event) => this.handleMarkerClick(event, lat, lng)}  />
              </div>
            )
          })
        }

        <DetailBubble 
          id="event"
          open={detailOpen}
          anchorEl={detailBubbleAnchorEl}
          onClose={this.handleDetailClose}
          lat={center.lat}
          lng={center.lng}
        />
      </GoogleMapReact>   
    )
  }

  render() {
    return (
      <div ref={map => this.map = map} style={{ width: '100%', height: '100%',}}>
        {this.renderMap()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchLocation: state.location.searchLocation
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
  })
(ShowsMap));
