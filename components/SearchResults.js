// TOP LEVEL IMPORTS
import React from 'react';
import { View, FlatList, Text, Image, StyleSheet } from 'react-native';
import { Icon, Button } from 'react-native-elements';
// MODULES
import { stylesConfig, colorConfig, SCREEN_WIDTH } from '../modules/config';
// APOLLO
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
	renderNoResults(){
		return (
			<EmptyState 
				imageComponent={<Image source={require('../assets/search.png')} 
				style={emptyStateIcon}/>} 
				pageText='NO RESULTS...' 
			/>
		);
	}
	render(){

		// if data is loading, show loader
		if (this.props.data.loading) {
			return <LoadingScreen loadingMessage='loading shops...' />
		}

		// if no results exist, show a now results EmptyState component
		if (!this.props.data || this.props.data.shops.length === 0) {
			return this.renderNoResults();
		}

		// if resuls, return FlatList of results
		return (
			<FlatList
			  data={this.props.data.shops}
			  keyExtractor={(item, index) => item._id}
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




