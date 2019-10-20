import React from 'react';
import ReactDOM from 'react-dom';

import { Map }from 'google-maps-react'
const mapStyles = {
  map: {
    width: '100%',
    height: '100%'
  }
};

class CurrentLocation extends React.Component {
    constructor(props) {
        super(props);
        const { lat, lng } = this.props.initialCenter;
        this.state = {
            currentLocation: {
                lat: lat,
                lng: lng
            } 
        };
    }
    
    
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
          this.loadMap();
        }

        if (prevState.currentLocation !== this.state.currentLocation) {
          this.recenterMap();
        }
    }

    recenterMap = () => {
        const map = this.map;
        const current = this.state.currentLocation;
    
        const google = this.props.google;
        const maps = google.maps;
    
        if (map) {
            let center = new maps.LatLng(current.lat, current.lng);
            map.panTo(center);
        }
    }

    componentDidMount() {
        if (this.props.centerAroundCurrentLocation) {
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(pos => {
                    const coords = pos.coords;
                    console.log(coords)
                    this.setState({
                        currentLocation: {
                            lat: coords.latitude,
                            lng: coords.longitude
                        }
                    });
                });
            }
        }
        this.loadMap();
    }

    renderChildren = () => {
        const { children } = this.props;
    
        if (!children) return;
    
        return React.Children.map(children, c => {
          if (!c) return;
          return React.cloneElement(c, {
            map: this.map,
            google: this.props.google,
            mapCenter: this.state.currentLocation
          });
        });
    }

    loadMap = () => {
      console.log('map rendered')
    }

    render() {
        const style = Object.assign({}, mapStyles.map);
        return (
          <Map
            google={this.props.google}
            initialCenter={{
              lat: -1.2884,
              lng: 36.8233
            }}
            center={this.state.currentLocation}
            style={style}
          >
            {this.renderChildren()}
          </Map>
        );
    }
  
}

export default CurrentLocation;



CurrentLocation.defaultProps = {
  zoom: 14,
  initialCenter: {
    lat: 37.774929,
    lng: -122.419416
  },
  centerAroundCurrentLocation: false,
  visible: true
};