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

		if (!this.props.data.loading && this.props.data.shops.length > 0) {
			let firstLocation = this.props.data.shops[0];
		    let region = {
	    		longitude: parseFloat(firstLocation.location.lng),
	  			latitude: parseFloat(firstLocation.location.lat),
		      	latitudeDelta: 0.09,
	  			longitudeDelta: 0.09,
		    }
		    
	    	return this.setState({region, selectedRegion: firstLocation._id, loading: false});
		}
	  	
	}
	render(){

		const { navigation, data } = this.props;

		if (data.loading) {
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
			        	{data.shops && data.shops.length > 0 && data.shops.map( item => {
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
			        	<FloatingButtonArea navigation={navigation} />
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
	buttonContainer: {
	    position: 'absolute',
	    display: 'flex',
	    alignItems: 'center',
	    justifyContent: 'center',
	    bottom: 20,
	    left: 0,
	    right: 0
	  }
});



const ComponentWithData = graphql(FETCH_SHOPS, {
  options: (props) => {
  	
  	let variables = { 
  		string: props.searchText,
  		categories: props.selectedCategories,
  		//nearMe: props.nearMe,
  		//nearMeLocation: props.nearMeLocation
  	};
  	console.log(variables)
  	return { variables } 
  }
})(MapScreen);

let mapStateTopProps = ({ filter }) => {
	return {
		searchText: filter.searchText,
		selectedCategories: filter.selectedCategories,
		nearMe: filter.nearMe,
		nearMeLocation: filter.nearMeLocation
	}
}

// EXPORT
// ====================================
export default connect( mapStateTopProps, actions )(ComponentWithData);