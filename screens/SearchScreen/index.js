// TOP LEVEL IMPORTS
import React from 'react';
import { Permissions, Location } from 'expo';
import { View, ScrollView, Text, Platform, StyleSheet, Dimensions, FlatList } from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';
// MODULES
import { stylesConfig, colorConfig } from '../../modules/config';
// COMPONENTS
import BackButton from '../../components/BackButton';
import ShopCard from '../../components/ShopCard';
// APOLLO
import { SEARCH_SHOPS, FETCH_SHOPS } from '../../apollo/queries';
import client from '../../ApolloClient';


// CONSTANTS & DESTRUCTURING
// ========================================
const { boldFont, semiboldFont, regularFont, titleStyle, basicHeaderStyle } = stylesConfig;
const SCREEN_WIDTH = Dimensions.get('window').width;



// EXPORTED COMPONENT
// ========================================
class SearchScreen extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		title: 'Search Shops',
		tabBarIcon: ({ tintColor }) => <Icon name="list" size={30} color={tintColor} />,
	  	headerTitleStyle: titleStyle,
	  	headerVisible: Platform.OS !== 'android',
	  	headerStyle: basicHeaderStyle,
	  	tabBarVisible: false,
	  	headerLeft: <BackButton goBack={navigation.goBack} label='' />,
	});

	state = { searching: false, data: [], errors: [] }

	onSearchChange = (value) => {
		//this.setState({searching: true, data: []});
		client.query({
	      query: SEARCH_SHOPS,
	      variables: { string: value }
	    }).then(({ data }) => {
	    	this.setState({data: data.shops, searching: false})
	    }); 
	}
	componentWillMount(){
		client.query({
	      query: FETCH_SHOPS,
	    }).then(({ data }) => {
	    	this.setState({data: data.shops, searching: false})
	    });
	}
	keyExtractor(item, index){
		return item._id;
	}
	renderSearchResults(){

		return (
			<FlatList
			  data={this.state.data}
			  keyExtractor={this.keyExtractor}
			  renderItem={({item}) => {
			  	return <ShopCard item={item} navigation={this.props.navigation} />
			  }}
			/>
		);
	}
	renderSearchingText(){
		return (
			<View style={{flex: 1, width: SCREEN_WIDTH}}>
				<Text style={{textAlign: 'center', marginTop: 50}}>Searching...</Text>
			</View>
		);
	}
	renderNoResults(){
		return (
			<View style={{flex: 1, width: SCREEN_WIDTH}}>
				<Text style={{textAlign: 'center', marginTop: 50}}>No Results...</Text>
			</View>
		);
	}
	render(){

		return (
			<View style={{ paddingBottom: 2, flex: 1, backgroundColor: colorConfig.screenBackground }}>
				<SearchBar
				  	onChangeText={this.onSearchChange}
				  	placeholder='Search shops...'
				  	lightTheme
				  	inputStyle={{ backgroundColor: '#fff' }}
					containerStyle={{ width: SCREEN_WIDTH }}
				/>

				{ this.state.searching && this.renderSearchingText() }

				{ !this.state.searching && this.state.data.length === 0 && this.renderNoResults() }

				{ this.state.data && this.state.data.length > 0 && this.renderSearchResults() }

			</View>
		);
	}
}


// STYLES
// ========================================
const styles = StyleSheet.create({
	contentContainerStyle: {
		backgroundColor: colorConfig.screenBackground,
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingBottom: 50
	},
	container: {
		flex: 1,
		backgroundColor: colorConfig.screenBackground,
		padding: 15,
		paddingTop: 0,
		width: SCREEN_WIDTH
	},
  linkText: {
  	color: colorConfig.business,
	fontSize: 15,
	fontFamily: boldFont,
  },
	headerStyle: {
		marginBottom: 6, 
		color: '#000',
		fontSize: 20,
		fontFamily: semiboldFont
	},
	subHeaderStyle: {
		fontFamily: regularFont,
		textAlign: 'center', 
		color: '#888'
	},
	contactButton: {
		backgroundColor: '#fff',
	}
});


// EXPORT
// ========================================
export default SearchScreen;

