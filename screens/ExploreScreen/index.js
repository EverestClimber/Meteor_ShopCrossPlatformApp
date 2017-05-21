// TOP LEVEL IMPORTS
import React from 'react';
import { View, FlatList, Text, Platform, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { Icon, Card, SearchBar, Button } from 'react-native-elements';
import { Permissions, Location, MapView, DangerZone } from 'expo';
// MODULES
import { stylesConfig, colorConfig, SCREEN_WIDTH } from '../../modules/config';
// APOLLO
import { userId } from 'meteor-apollo-accounts'
import { FETCH_SHOPS, SEARCH_SHOPS } from '../../apollo/queries';
import { graphql, withApollo } from 'react-apollo';
import client from '../../ApolloClient';
// REDUX
import { connect } from 'react-redux';
import * as actions from '../../actions';
// COMPONENTS
import LoadingScreen from '../../components/LoadingScreen';
import EmptyState from '../../components/EmptyState';
import ShopCard from '../../components/ShopCard';
import SearchResults from '../../components/SearchResults';



// CONSTANTS & DESTRUCTURING
// ====================================
const { basicHeaderStyle, titleStyle, regularFont, emptyStateIcon } = stylesConfig;




// NAVIGATION OPTIONS
// ====================================
const navigationOptions = ({ navigation, screenProps }) => ({
		title: 'Explore',
		tabBarIcon: ({ tintColor }) => <Icon name="search" size={30} color={tintColor} />,
	  	headerTitleStyle: titleStyle,
	  	headerVisible: Platform.OS !== 'android',
	  	tabBarLabel: 'Explore',
	  	headerStyle: basicHeaderStyle,
	});


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
				{getButton('map', 'map', "MAP")}
				{getButton('filters', 'filter-list', "FILTER")}
			</View>
		</View>
	);
}

// EXPORTED COMPONENT
// ====================================
class ExploreScreen extends React.Component {

	static navigationOptions = navigationOptions;

	constructor(props){
		super(props);
		this.state = { 
			refreshing: false,
			data: [],
			searching: true
		}
	}
	onSearchChange = (value) => {
		this.props.onSearchTextChange(value)
	}
	render(){

		return (
			<View style={{ paddingBottom: 2, flex: 1, backgroundColor: colorConfig.screenBackground }}>
				<SearchBar
				  	onChangeText={this.onSearchChange}
				  	placeholder='Search shops...'
				  	lightTheme
				  	defaultValue={this.props.searchText || ''}
				  	inputStyle={{ backgroundColor: '#fff' }}
					containerStyle={{ width: SCREEN_WIDTH }}
				/>
				<SearchResults {...this.props} />
				<FloatingButtonArea navigation={this.props.navigation} />
			</View>		
		);
	}
}



const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colorConfig.screenBackground,
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




let mapStateTopProps = ({ filter }) => {
	return {
		searchText: filter.searchText
	}
}

export default connect( mapStateTopProps, actions )(ExploreScreen);



