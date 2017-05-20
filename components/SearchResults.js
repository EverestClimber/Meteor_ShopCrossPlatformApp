// TOP LEVEL IMPORTS
import React from 'react';
import { View, FlatList, Text, Platform, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { Icon, Card, SearchBar, Button } from 'react-native-elements';
import { Permissions, Location, MapView, DangerZone } from 'expo';
// MODULES
import { stylesConfig, colorConfig, SCREEN_WIDTH } from '../modules/config';
// APOLLO
import { userId } from 'meteor-apollo-accounts'
import { FETCH_SHOPS, SEARCH_SHOPS } from '../apollo/queries';
import { graphql } from 'react-apollo';
import client from '../ApolloClient';
// REDUX
import { connect } from 'react-redux';
import * as actions from '../actions';
// COMPONENTS
import LoadingScreen from './LoadingScreen';
import EmptyState from './EmptyState';
import ShopCard from './ShopCard';
//


// CONSTANTS & DESTRUCTURING
// ====================================
const { basicHeaderStyle, titleStyle, regularFont, emptyStateIcon } = stylesConfig;


// EXPORTED COMPONENT
// ====================================
class SearchResults extends React.Component {
	constructor(props){
		super(props);
		this.state = { 
			refreshing: false,
			searching: true
		}
	}
	
	keyExtractor(item, index){
		return item._id;
	}
	render(){

		if (this.props.data.loading) {
			return <LoadingScreen loadingMessage='loading shops...' />
		}

		return (
			<FlatList
			  data={this.props.data.shops}
			  keyExtractor={this.keyExtractor}
			  refreshing={this.state.refreshing}
			  onRefresh={this.onRefresh}
			  removeClippedSubviews={false}
			  renderItem={({item}) => <ShopCard item={item} navigation={this.props.navigation} />}
			/>
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
})(SearchResults);

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




