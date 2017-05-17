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
// APOLLO
import client from '../../ApolloClient';
import { FETCH_SHOPS, SEARCH_SHOPS } from '../../apollo/queries';

// CONSTANTS & DESTRUCTURING
// ========================================
const { boldFont, semiboldFont, regularFont, titleStyle, basicHeaderStyle } = stylesConfig;



const ShopListCard = ({ item, navigation }) => {
	const onCardPress = () => {
		//if location exists, go to map, if not, do not go to map
		navigation.navigate('shopDetail', { _id: item._id, shopTitle: item.title });
	}
	return (
		<Card containerStyle={{width: 150, padding: 0}}>
			<TouchableOpacity onPress={() => onCardPress()} activeOpacity={0.9}>
				<Image 
					source={{ uri: item.image || DEFAULT_SHOP_IMAGE }} 
					style={{flex: 1, minHeight: 100}}
				/>
				<View style={{flex: 2, padding: 10}}>
					<View style={{flexDirection:'row', flexWrap:'wrap', alignItems: 'flex-end', justifyContent: 'flex-start'}}>
						<Icon name='label-outline' iconStyle={{ fontSize: 13, marginRight: 5, color: '#bdc3c7' }} />
						<Text style={{ fontSize: 13, color: '#bdc3c7' }}>
							{item.category || ''}
						</Text>
					</View>
					{/*<CardDescription item={item}  navigation={navigation} />
					<CardBottom item={item}  />*/}
				</View>
			</TouchableOpacity>
		</Card>
	);
}


const ShopListHorizontal = (props) => {
	return (
		<View style={{flex: 2, backgroundColor: colorConfig.screenBackground, padding: 10}}>
	    	<ScrollView horizontal style={{flex: 1}}>
	    		{props.navigation.state.params.data.map( item => {
	    			return (
	    				<ShopListCard key={item._id} item={item} {...props} />
	    			);
	    		})}
	    	</ScrollView>
	    </View>
	);
}


class MapScreen extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		mode: 'modal',
	  	header: null, 
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
			          style={{ flex: 5 }}
			          loadingEnabled
			          onRegionChangeComplete={this.onRegionChangeComplete}
			        >
			        <View style={styles.backButtonContainer}>
			        	<Icon size={33} color='#666' name='close' onPress={()=>this.props.navigation.goBack()} />
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
			        <ShopListHorizontal {...this.props} />
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