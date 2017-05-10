import React from 'react';
import { Permissions, Location } from 'expo';
import { View, ScrollView, Text, Platform, StyleSheet, Dimensions } from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';
import { stylesConfig, colorConfig } from '../../modules/config';
import BackButton from '../../components/BackButton';
import { SEARCH_MESSAGES, FETCH_MESSAGES } from '../../apollo/queries';
import client from '../../ApolloClient';
import ReportCard from '../../components/ReportCard';


const { boldFont, semiboldFont, regularFont, titleStyle, basicHeaderStyle } = stylesConfig;
const SCREEN_WIDTH = Dimensions.get('window').width;


class SearchScreen extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		title: 'Search Reports',
		tabBarIcon: ({ tintColor }) => <Icon name="list" size={30} color={tintColor} />,
	  	headerTitleStyle: titleStyle,
	  	headerVisible: Platform.OS !== 'android',
	  	tabBarLabel: 'Documents',
	  	headerStyle: basicHeaderStyle,
	  	tabBarVisible: false,
	  	headerLeft: <BackButton goBack={navigation.goBack} label='' />,
	});

	state = { searching: false, data: [], errors: [] }

	onSearchChange = (value) => {
		//this.setState({searching: true, data: []});
		client.query({
	      query: SEARCH_MESSAGES,
	      variables: { string: value }
	    }).then(({ data }) => {
	    	this.setState({data: data.messages, searching: false})
	    }); 
	}
	componentWillMount(){
		client.query({
	      query: FETCH_MESSAGES,
	    }).then(({ data }) => {
	    	this.setState({data: data.messages, searching: false})
	    });
	}
	renderSearchResults(){
		return this.state.data.map( item => {
					return (
						<View key={item._id} style={{flex: 1, width: SCREEN_WIDTH-10}}>
							<ReportCard item={item} navigation={this.props.navigation} />
						</View>
					); 
				})
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
			<ScrollView
				style={styles.container}
				contentContainerStyle={styles.contentContainerStyle}

			>
			<SearchBar
			  	onChangeText={this.onSearchChange}
			  	placeholder='Search reports...'
			  	lightTheme
			  	inputStyle={{ backgroundColor: '#fff' }}
				containerStyle={{ width: SCREEN_WIDTH }}
			/>

			{ this.state.searching && this.renderSearchingText() }

			{ !this.state.searching && this.state.data.length === 0 && this.renderNoResults() }

			{ this.state.data && this.state.data.length > 0 && this.renderSearchResults() }
			
			</ScrollView>
		);
	}
}



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

export default SearchScreen;