// TOP LEVEL IMPORTS
import React from 'react';
import { View, Text, Platform, StyleSheet, Animated, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Icon, SearchBar, Card } from 'react-native-elements';
import { Header } from 'react-navigation';
import { Permissions, Location, MapView, DangerZone } from 'expo';
import _ from 'lodash'
// MODULES
import { stylesConfig, colorConfig, SCREEN_WIDTH, DEFAULT_SHOP_IMAGE } from '../../modules/config';
// COMPONENTS
import LoadingScreen from '../../components/LoadingScreen';
import ShopCard from '../../components/ShopCard';
import ShopListHorizontal from '../../components/ShopListHorizontal';
import BackButton from '../../components/BackButton';
// REDUX
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { graphql } from 'react-apollo';
// APOLLO
import client from '../../ApolloClient';
import { FETCH_SHOPS, SEARCH_SHOPS } from '../../apollo/queries';

// CONSTANTS & DESTRUCTURING
// ========================================
const { boldFont, semiboldFont, regularFont, titleStyle, basicHeaderStyle } = stylesConfig;


const FloatingButtonArea = (props) => {

	const getButton = (route, icon, label) => (
		<Button
			buttonStyle={{borderRadius: 50, width: 70}}
			backgroundColor={'#fff'}
			title={label}
			color={'#000'}
			iconRight
			textStyle={{fontSize: 12}}
			icon={{ name: icon, color: '#000'}}
			onPress={()=>props.navigation.navigate(route, { data: []})}
		/>
	);

	return (
		<View style={styles.buttonContainer}>
			<View style={styles.buttonInsideContainer}>
				{getButton('filters', 'filter-list', "FILTER")}
			</View>
		</View>
	);
}

const SearchAreaButton = (props) => {

	return (
		<View style={styles.searchAreaContainer}>
			<View style={styles.buttonInsideContainer}>
				<Button
					buttonStyle={{borderRadius: 50, width: 200}}
					backgroundColor={colorConfig.business}
					title={'Redo search in this area'}
					color={'#fff'}
					textStyle={{fontSize: 11}}
					onPress={()=>console.log('rerun query with new location')}
				/>
			</View>
		</View>
	);
}


const navigationOptions = ({ navigation, screenProps }) => ({
		title: 'Shop Map',
		tabBarIcon: ({ tintColor }) => <Icon name="search" size={30} color={tintColor} />,
	  	headerTitleStyle: titleStyle,
	  	headerVisible: Platform.OS !== 'android',
	  	tabBarLabel: 'Explore',
	  	headerStyle: basicHeaderStyle,
	  	tabBarVisible: false,
	  	headerLeft: <BackButton goBack={navigation.goBack} label='' />,
	});
// CONSTANTS & DESTRUCTURING
// ========================================
class MapScreen extends React.Component {
	static navigationOptions = navigationOptions;
	constructor(props){
		super(props);
		this.state = {
			loading: true,
			data: [],
			searching: true,
			selectedRegion: null,
			region: null,
			showRedoSearch: false
		}
	}
	animateToCoordinate = (currentShopId) => {
		const { shops } = this.props.data;
		let selectedShop = _.find(shops, {'_id': currentShopId });
		if (!selectedShop) { return; }
		if (!selectedShop.location) { return; }
		// check if lat/lng exist, 
		// then check this.map ref to make sure the component exists
		if (selectedShop.location.lng && selectedShop.location.lat && this.map) { 
			let selectedRegion = {
	    		longitude: parseFloat(selectedShop.location.lng).toFixed(4),
	  			latitude: parseFloat(selectedShop.location.lat).toFixed(4),
		    }
		    console.log(selectedRegion)
			this.map.animateToCoordinate(selectedRegion, 230)
		}
	}
	componentWillUpdate = (nextProps, nextState) => {
		const { currentShopId } = this.props;
		if (nextProps.currentShopId) {
			this.animateToCoordinate(nextProps.currentShopId || currentShopId)
		}
		
	}
	async componentDidMount() {
		const { data, currentShopId } = this.props;
		if (!data.loading && data.shops.length > 0) {
			this.animateToCoordinate(currentShopId);
/*		    let region = {
	    		longitude: parseFloat(data.shops[0].location.lng),
	  			latitude: parseFloat(data.shops[0].location.lat),
		      	latitudeDelta: 0.09,
	  			longitudeDelta: 0.09,
		    }
		    */
	    	return this.setState({loading: false});
		}
	  	
	}
	render(){

		const { navigation, data, currentShopId } = this.props;

		if (data.loading) {
			return <LoadingScreen loadingMessage='Loading...' />;
		}

		if (!data.shops || !data.shops.length === 0) {
			return <View><Text>NO SHOPS</Text></View>;
		}

			return (	
				<View style={styles.container}>
					
					<MapView		
						style={{ flex: 5 }}
						showsUserLocation
						showsMyLocationButton
						showsPointsOfInterest
						loadingEnabled
						ref={ref => { this.map = ref; }}
					>
						{data.shops && data.shops.length > 0 && data.shops.map( item => {
							if (!item.location || !item.location.lng || !item.location.lat) {
								return null
							}
							return (
								<MapView.Marker
									key={item._id}
									title={item.title}
									description={item.description}
									pinColor={item._id === currentShopId ? colorConfig.business: 'red'}
									coordinate={{ 
										latitude: parseFloat(item.location.lat), 
										longitude: parseFloat(item.location.lng) 
									}}
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
					{this.state.showRedoSearch && <SearchAreaButton {...this.props} />}
					<FloatingButtonArea navigation={navigation} />
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
	},
	buttonInsideContainer: {
		shadowColor: '#888',
	    shadowOffset: {
	      width: 0,
	      height: 1
	    },
	    shadowRadius: 4,
	    shadowOpacity: .5,
		borderRadius: 50, 
		backgroundColor: '#fff', 
		flexDirection: 'row', 
		display: 'flex', 
		width: 195, 
		alignItems: 'stretch', 
		justifyContent: 'center'
	},
	searchAreaContainer: {
		position: 'absolute',
		display: 'flex',
	    alignItems: 'center',
	    justifyContent: 'center',
	    top: 30,
	    left: 0,
	    right: 0
	},
	buttonContainer: {
	    position: 'absolute',
	    display: 'flex',
	    alignItems: 'center',
	    justifyContent: 'center',
	    bottom: 200,
	    left: 0,
	    right: 0
	}
});


// Wrap the map component in graphql HOC so it makes a query
// Before exporting this ComponentWithData component, we also wrap it in redux connect
// this will give us access to variables inside of the redux store, and will rerun the 
// query when those variables change (e.g. when somebody opens the FilterScreen and makes a change
// that change will propogate to the shops show on the map screen )
let options = (props) => {
	let variables = { 
  		string: props.searchText,
  		categories: props.selectedCategories,
  		nearMe: props.nearMe,
  		latitude: props.nearMeLocation && props.nearMeLocation.coords.latitude,
  		longitude: props.nearMeLocation && props.nearMeLocation.coords.longitude,
  		//nearMeLocation: props.nearMeLocation
  	};
  	return { variables } 
}

const ComponentWithData = graphql(FETCH_SHOPS, { options })(MapScreen);


// map redux state to props, which are then used in the above ComponentWithData in the graphql query
let mapStateTopProps = ({ filter, mapScreen }) => {
	return {
		searchText: filter.searchText,
		selectedCategories: filter.selectedCategories,
		nearMe: filter.nearMe,
		nearMeLocation: filter.nearMeLocation,
		currentShopId: mapScreen.currentShopId
	}
}

// EXPORT
// ====================================
// exports component that is wrapped in redux first, and then wrapped in graphql second
// this gives us redux variables to use in our graphql query.
export default connect( mapStateTopProps, actions )(ComponentWithData);
