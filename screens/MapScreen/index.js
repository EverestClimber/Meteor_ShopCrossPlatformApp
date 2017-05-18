// TOP LEVEL IMPORTS
import React from 'react';
import { View, Text, Platform, StyleSheet, Animated, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Icon, SearchBar, Card } from 'react-native-elements';
import { Header } from 'react-navigation';
import { Permissions, Location, MapView, DangerZone } from 'expo';
// MODULES
import { stylesConfig, colorConfig, SCREEN_WIDTH, DEFAULT_SHOP_IMAGE } from '../../modules/config';
// COMPONENTS
import LoadingScreen from '../../components/LoadingScreen';
import ShopCard from '../../components/ShopCard';
import ShopListHorizontal from '../../components/ShopListHorizontal';

// APOLLO
import client from '../../ApolloClient';
import { FETCH_SHOPS, SEARCH_SHOPS } from '../../apollo/queries';

// CONSTANTS & DESTRUCTURING
// ========================================
const { boldFont, semiboldFont, regularFont, titleStyle, basicHeaderStyle } = stylesConfig;




// CONSTANTS & DESTRUCTURING
// ========================================
class MapScreen extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
	  	//header: null,
	  	tabBarVisible: false
	});
	constructor(props){
		super(props);
		this.state = {
			//loadingLocation: false,
			loading: true,
			data: [],
			searching: true,
			selectedRegion: null,
			region: null
			/*region: {
	    		longitude: -122,
      			latitude: 37,
		      	longitudeDelta: 0.04,
		      	latitudeDelta: 0.09
		    }*/
		}
	}
	async componentDidMount() {

	  	let firstLocation = this.props.navigation.state.params.data[0];
	    let region = {
	    		longitude: parseFloat(firstLocation.location.lng),
      			latitude: parseFloat(firstLocation.location.lat),
		      	latitudeDelta: 0.09,
      			longitudeDelta: 0.09,
		    }
		    
	    return this.setState({region, selectedRegion: firstLocation._id, loading: false});
	}
	renderCurrentLocation(){
		const { coords } = this.props.screenProps.currentLocation;
		return (
			<MapView.Marker
				title={'Your Current Location'}
				pinColor='#000'
				coordinate={{ latitude: parseFloat(coords.latitude), longitude: parseFloat(coords.longitude) }}
			/>
		);
	}
	render(){

		const { navigation } = this.props;

		if (this.state.loading) {
			return <LoadingScreen loadingMessage='Loading...' />;
		}
			return (
				<View style={styles.container}>
				<MapView
			          region={this.state.region}
			          style={{ flex: 5 }}
			          showsUserLocation
			          showsMyLocationButton
			          ref={ref => { this.map = ref; }}
			    >
			       {/*<View style={styles.backButtonContainer}>
			        	<Icon size={33} color='#666' name='close' onPress={()=>navigation.goBack()} />
					</View>*/}
			        	{navigation.state.params.data 
			        		&& navigation.state.params.data.length > 0 
			        		&& navigation.state.params.data.map( item => {
			        		return (
			        			<MapView.Marker
			        				key={item._id}
			        				title={item.title}
			        				description={item.description}
			        				coordinate={{ latitude: parseFloat(item.location.lat), longitude: parseFloat(item.location.lng) }}
			        			>
				        			<MapView.Callout tooltip>
						        		<ShopCard item={item} navigation={navigation} />
						        	</MapView.Callout>
					        	</MapView.Marker>
			        		);
			        	})}
			        </MapView>
			        <View style={{flex: 2, backgroundColor: colorConfig.screenBackground, padding: 10}}>
			        	<ShopListHorizontal {...this.props} />
			        </View>
			    </View>
			);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colorConfig.screenBackground,
	},
	backButtonContainer: {
	    position: 'absolute',
	    top: 22,
	    left: 10
	}
});


export default MapScreen