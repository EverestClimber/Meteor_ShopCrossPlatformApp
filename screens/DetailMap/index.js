//TOP LEVEL IMPORTS
import React from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Header } from 'react-navigation';
import { Permissions, Location, MapView } from 'expo';
// MODULES
import { stylesConfig, colorConfig, SCREEN_WIDTH } from '../../modules/config';
// APOLLO
import { FETCH_SHOP } from '../../apollo/queries';
import { graphql } from 'react-apollo';
// COMPONENTS
import LoadingScreen from '../../components/LoadingScreen';
import ShopCard from '../../components/ShopCard';
import BackButton from '../../components/BackButton';


// CONSTANTS & DESTRUCTURING
// ========================================
const { boldFont, semiboldFont, regularFont, titleStyle, basicHeaderStyle } = stylesConfig;


// NAVIGATION OPTIONS
// ====================================
const navigationOptions = ({ navigation, screenProps }) => ({
		title: 'Map',
		tabBarIcon: ({ tintColor }) => <Icon name="add-location" size={30} color={tintColor} />,
	  	headerTitleStyle: titleStyle,
	  	header: (headerProps) => Platform.OS === 'android' ? null : <Header {...headerProps} />, 
	  	tabBarLabel: Platform.OS === 'android' ? ({ tintColor }) => <Icon name="add-location" size={30} color={tintColor} /> : 'Location',
	  	headerStyle: basicHeaderStyle,
	  	tabBarVisible: false,
	  	headerLeft: <BackButton goBack={navigation.goBack} label='' />,
	});


// EXPORTED COMPONENT
// ========================================
class DetailMap extends React.Component {
	static navigationOptions = navigationOptions;
	constructor(props){
		super(props);
		this.state = {
			loadingLocation: false,
			data: [],
			searching: true,
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
		      	latitudeDelta: 0.0922,
      			longitudeDelta: 0.0421,
		    }
	    return this.setState({region})
	  } else {
	    throw new Error('Location permission not granted');
	  }
	}
	render(){
		const { data, navigation } = this.props;
		if (data.loading) {
			return (
				<LoadingScreen loadingMessage='Loading...' />
			);
		}


			return (
				<View style={styles.container}>
					<MapView
			          region={this.state.region}
			          style={{ flex: 1 }}
			          loadingEnabled
			          onRegionChangeComplete={this.onRegionChangeComplete}
			        >
			        <MapView.Marker
        				key={data.shopById._id}
        				title={data.shopById.title}
        				description={data.shopById.description}
        				coordinate={{ latitude: parseFloat(data.shopById.location.lat), longitude: parseFloat(data.shopById.location.lng) }}
        			>
	        			<MapView.Callout tooltip>
			        		<ShopCard item={data.shopById} navigation={navigation} />
			        	</MapView.Callout>
		        	</MapView.Marker>
			        </MapView>
				</View>
			);
	}
}


// STYLES
// ========================================
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colorConfig.screenBackground,
	}
});

// EXPORT
// ========================================
export default graphql(FETCH_SHOP, {
  options: (props) => { 
  	let variables = { _id: props.navigation.state.params._id };
  	return { variables } 
  }
})(DetailMap);