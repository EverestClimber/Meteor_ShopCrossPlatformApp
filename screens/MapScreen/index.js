// TOP LEVEL IMPORTS
import React from 'react';
import { View, Text, Platform, StyleSheet, Animated, Image, ScrollView } from 'react-native';
import { Button, Icon, SearchBar, Card } from 'react-native-elements';
import { Header } from 'react-navigation';
import { Permissions, Location, MapView, DangerZone } from 'expo';
// MODULES
import { stylesConfig, colorConfig, SCREEN_WIDTH } from '../../modules/config';
// COMPONENTS
import LoadingScreen from '../../components/LoadingScreen';
import ShopCard from '../../components/ShopCard';
// APOLLO
import client from '../../ApolloClient';
import { FETCH_SHOPS, SEARCH_SHOPS } from '../../apollo/queries';

// CONSTANTS & DESTRUCTURING
// ========================================
const { boldFont, semiboldFont, regularFont, titleStyle, basicHeaderStyle } = stylesConfig;


class MapScreen extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		mode: 'modal',
	  	header: null, //(headerProps) => Platform.OS === 'android' ? null : <Header {...headerProps} />, 
	  	tabBarVisible: false
	});
	constructor(props){
		super(props);
		this.state = {
			//loadingLocation: false,
			loading: true,
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
	  	let firstLocation = this.props.navigation.state.params.data[0];
	    let region = {
	    		longitude: parseFloat(firstLocation.location.lng) || -122,
      			latitude: parseFloat(firstLocation.location.lat) || 37,
		      	latitudeDelta: 0.0922,
      			longitudeDelta: 0.0421,
		    }
	    return this.setState({region, loading: false});
	}
	onRegionChangeComplete = (region) => {
		this.setState({ region });
	}

	render(){


		if (this.state.loading) {
			return <LoadingScreen loadingMessage='Loading...' />;
		}


			return (
				<View style={styles.container}>
				<MapView
			          region={this.state.region}
			          style={{ flex: 4 }}
			          loadingEnabled
			          onRegionChangeComplete={this.onRegionChangeComplete}
			        >
			        <View style={styles.backButtonContainer}>
						<Button
				            backgroundColor={'transparent'}
				            title="Back"
				            color={'#000'}
				            icon={{ name: 'keyboard-backspace', color: '#000'}}
				            onPress={()=>this.props.navigation.goBack()}
				          />
					</View>
			        	{this.props.navigation.state.params.data 
			        		&& this.props.navigation.state.params.data.length > 0 
			        		&& this.props.navigation.state.params.data.map( item => {
			        		return (
			        			<MapView.Marker
			        				key={item._id}
			        				title={item.title}
			        				description={item.description}
			        				coordinate={{ latitude: parseFloat(item.location.lat), longitude: parseFloat(item.location.lng) }}
			        			>
				        			<MapView.Callout tooltip>
						        		<ShopCard item={item} navigation={this.props.navigation} />
						        	</MapView.Callout>
					        	</MapView.Marker>
			        		);
			        	})}
			        	
			        </MapView>
			        <View style={{flex: 2, backgroundColor: colorConfig.screenBackground}}>
			        	<ScrollView horizontal style={{flex: 1}}>
			        		{this.props.navigation.state.params.data.map( item => {
			        			return (
			        				<ShopCard key={item._id} item={item} />
			        			);
			        		})}
			        	</ScrollView>
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
	    top: 20,
	    left: 0
	  }
});


export default MapScreen