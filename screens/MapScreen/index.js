import React from 'react';
import { View, Text, Platform, StyleSheet, Animated } from 'react-native';
import { stylesConfig, colorConfig } from '../../modules/config';
import { graphql } from 'react-apollo'
import LoadingScreen from '../../components/LoadingScreen';
import { Button, Icon } from 'react-native-elements';
import ApolloClient from '../../ApolloClient';
import { Permissions, Location, MapView, DangerZone } from 'expo';
import { Header } from 'react-navigation';
// CONSTANTS & DESTRUCTURING
// ========================================
const { boldFont, semiboldFont, regularFont, titleStyle, basicHeaderStyle } = stylesConfig;


class MapScreen extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		title: 'Map',
		tabBarIcon: ({ tintColor }) => <Icon name="add-location" size={30} color={tintColor} />,
	  	headerTitleStyle: titleStyle,
	  	header: (headerProps) => Platform.OS === 'android' ? null : <Header {...headerProps} />, 
	  	tabBarLabel: Platform.OS === 'android' ? ({ tintColor }) => <Icon name="add-location" size={30} color={tintColor} /> : 'Location',
	  	headerStyle: basicHeaderStyle,
	});
	constructor(props){
		super(props);
		this.state = {
			loadingLocation: false,
			
			region: {
	    		longitude: -122,
      			latitude: 37,
		      	longitudeDelta: 0.04,
		      	latitudeDelta: 0.09
		    }
		}
	}
	async componentDidMount() {
	  const { status } = await Permissions.askAsync(Permissions.LOCATION);
	  if (status === 'granted') {
	    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
	    let region = {
	    		longitude: location.coords.longitude || -122,
      			latitude: location.coords.latitude || 37,
		      	longitudeDelta: 0.04,
		      	latitudeDelta: 0.09
		    }
	    return this.setState({region})
	  } else {
	    throw new Error('Location permission not granted');
	  }
	}
	onRegionChangeComplete = (region) => {
		this.setState({ region });
	}
	render(){

		if (this.state.loadingLocation) {
			return (
				<LoadingScreen loadingMessage='Loading Location...' />
			);
		}
		
		return (
			<View style={styles.container}>
				<MapView
		          region={this.state.region}
		          style={{ flex: 1 }}
		          onRegionChangeComplete={this.onRegionChangeComplete}
		        />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colorConfig.screenBackground,
	}
});

export default MapScreen;