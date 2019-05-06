import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';
import { geolocated } from 'react-geolocated';
import { setSearchLocation } from '../../actions/location.js';
import ResizeObserver from 'react-resize-observer';
import MapMarker from './MapMarker.js';

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
      deviceLocation: {},
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

      this.setState({
        deviceLocation: {
          lat: latitude,
          lng: longitude
        }
      })
    }
  }

  handleApiLoaded = (map, maps) => {
    const { lat, lng } = this.state.deviceLocation;
    const geocoder = new maps.Geocoder();

    geocoder.geocode({
      location: {
        lat,
        lng
      }
    }, (results, status) => {
      if (status === 'OK') {
        console.log(results)
        let postalCodeArea = results.filter((result) => {
          return result.address_components.length === 4 && result.types.includes('postal_code')
        })[0];

        let locationInfo = {
          name: postalCodeArea.formatted_address,
          center: {
            lat: postalCodeArea.geometry.location.lat(),
            lng: postalCodeArea.geometry.location.lng()
          },
          viewport: {
            ne: {
              lat: postalCodeArea.geometry.viewport.getNorthEast().lat(),
              lng: postalCodeArea.geometry.viewport.getNorthEast().lng()
            },
            sw: {
              lat: postalCodeArea.geometry.viewport.getSouthWest().lat(),
              lng: postalCodeArea.geometry.viewport.getSouthWest().lng()
            }
          }
        }
        this.props.setSearchLocation(locationInfo);
      }
      else {
        console.log('The geocoder failed to retreive geocode becuase of ', status)
      }
    })
  }

  renderMap = () => {
    const { viewport } = this.props.searchLocation;
    const { center, zoom } = fitBounds(viewport, { width: 400, height: 600})
    console.log(center, zoom)
    return (
      <GoogleMapReact
        yesIWantToUseGoogleMapApiInternals
        bootstrapURLKeys={{ key: 'AIzaSyC-mITYSots24MEoNzoPew533UKmVOga8Y' }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        zoom={zoom + 1}
        center={this.props.searchLocation.center}
        onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
      >
        {
          showLocations.map((location, index) => {
            return <MapMarker key={index} lat={location.lat} lng={location.lng} />
          })
        }
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
    setSearchLocation: (location) => dispatch(setSearchLocation(location))
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(
  geolocated({
    positionOptions: {
      enableHighAccuracy: false
    },
    geolocationProvider: navigator.geolocation
  })
(ShowsMap));
