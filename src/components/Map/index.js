// React & Redux Packages
import React, { Component } from 'react';
import { connect } from 'react-redux';

// 'google-maps-react' Packages
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';


const mapStyles = {
	width: '100%',
	height: '100%'
}

class SearchMap extends Component {
	constructor(props) {
		super(props);
		const { lat, lng } = this.props.center;
		this.state = {
			showingInfoWindow: false, 
			activeMarker: {},          
			selectedPlace: {}  ,
			currentLocation: {
				lat: lat,
				lng: lng
			}    
		};
	}

	componentDidMount() {
		if (navigator && navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(pos => {
				const coords = pos.coords;
				this.props.onLocationChange({
					location: {
						lat: coords.latitude,
						lng: coords.longitude
					}
				});
			});
		}
	} 

	componentDidUpdate(prevProps) {
		if (prevProps.center !== this.state.currentLocation) {
			
			this.setState({ currentLocation: this.props.center });
		}
	}

	onMarkerClick = (props, marker, e) =>
		this.setState({
			selectedPlace: props,
			activeMarker: marker,
			showingInfoWindow: true
		});

	onClose = props => {
		if (this.state.showingInfoWindow) {
			this.setState({
				showingInfoWindow: false,
				activeMarker: null
			});
		}
	};

	render() {
		return (
			<Map
				google={this.props.google}
				center={this.props.center}
				style={mapStyles}
			> 
				<Marker
					onClick={this.onMarkerClick}
					name={'Schaumburg'}
					position={this.state.currentLocation}
				/>
				<InfoWindow
					marker={this.state.activeMarker}
					visible={this.state.showingInfoWindow}
					onClose={this.onClose}
				>
					<div>
						<h4>{this.state.selectedPlace.name}</h4>
					</div>
				</InfoWindow>
			</Map>
		);
	}
}

SearchMap.defaultProps = {
	zoom: 14,
	visible: true,
	initialCenter: {
		lat: 37.774929,
		lng: -122.419416
	},
	centerAroundCurrentLocation: false,
};

export default GoogleApiWrapper({
  	apiKey: 'AIzaSyC-mITYSots24MEoNzoPew533UKmVOga8Y'
})(SearchMap);
