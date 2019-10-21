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
			selectedPlace: {},
			currentLocation: {
				lat: lng,
				lng: lng
			}
		};
	}

	componentDidUpdate(prevProps) {
		if (this.props.center !== this.state.currentLocation) {
			this.setState({
				currentLocation: this.props.center
			});
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
		console.log('render')
		return (
			<Map
				google={this.props.google}
				center={this.state.currentLocation}
				style={mapStyles}
				initialCenter={this.props.center}
			> 
				<Marker
					onClick={this.onMarkerClick}
					name={'Schaumburg'}
					position={this.props.center}
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

export default GoogleApiWrapper({
  	apiKey: 'AIzaSyC-mITYSots24MEoNzoPew533UKmVOga8Y'
})(SearchMap);
