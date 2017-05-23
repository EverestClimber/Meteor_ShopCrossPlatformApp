// TOP LEVEL IMPORTS
import React from 'react';
import { View, FlatList, Text, Platform, Image, ActivityIndicator } from 'react-native';
import { Icon, Card, SearchBar, Button } from 'react-native-elements';
// MODULES
import { stylesConfig, colorConfig, SCREEN_WIDTH } from '../../modules/config';
// APOLLO
import client from '../../ApolloClient';
import { userId } from 'meteor-apollo-accounts'
import { FETCH_SHOPS_BY_OWNER, SEARCH_SHOPS_BY_OWNER } from '../../apollo/queries';
//COMMON COMPONENTS
import LoadingScreen from '../../components/LoadingScreen';
import EmptyState from '../../components/EmptyState';
import ShopCard from '../../components/ShopCard';


// CONSTANTS & DESTRUCTURING
// ====================================
const { basicHeaderStyle, titleStyle, regularFont, emptyStateIcon } = stylesConfig;


const navigationOptions = ({ 
		navigation, 
		screenProps: { data } 
	}) => ({
		title: 'My Listings',
		tabBarIcon: ({ tintColor }) => <Icon name="home" size={30} color={tintColor} />,
	  	headerTitleStyle: titleStyle,
	  	headerVisible: Platform.OS !== 'android',
	  	tabBarLabel: 'My Listings',
	  	headerStyle: basicHeaderStyle,
	  	headerRight: data.user && data.user.roles.includes('manager') ? (
	  		<Button
	  			backgroundColor={colorConfig.business}
	  			fontFamily={regularFont}
	  			title={'+ Add Shop'} 
	  			color={'#fff'} 
	  			onPress={()=>navigation.navigate('addShop')} 
	  		/>
	  	) : null,
	});

// EXPORTED COMPONENT
// ====================================
class MyListingsScreen extends React.Component {
	
	static navigationOptions = navigationOptions;

	constructor(props){
		super(props);
		this.onEndReached = this.onEndReached.bind(this);
		this.state = { 
			refreshing: false,
			data: [],
			searching: true
		}
	}
	
	keyExtractor(item, index){
		return item._id;
	}
	onRefresh = () => {
		this.setState({refreshing: true})
		client.query({
	      query: FETCH_SHOPS_BY_OWNER,
	    }).then(({ data }) => {
	    	this.setState({data: data.shopsByOwner, refreshing: false})
	    });
	}
	onEndReached(){
		if (this.state.data.length < 10) { 
			// if there are less than 10 resuls on the screen, 
			// there are no more results in the DB (as it sends 10 at a time)
			return console.log('more more results')
		}
		this.props.data.fetchMore({
			variables: { offset: this.state.data.length },
			updateQuery: (previousResult, { fetchMoreResult }) => {
					// Don't do anything if there weren't any new items
					if (!fetchMoreResult || fetchMoreResult.shopsByOwner.length === 0) {
						return previousResult;
					}
					let newData = this.state.data.concat(fetchMoreResult.shopsByOwner)
					this.setState({data: newData });
					return {
					// Append the new feed results to the old one
					shopsByOwner: previousResult.shopsByOwner.concat(fetchMoreResult.shopsByOwner),
					};
			},
		}).catch(err => {
			const errors = err && err.graphQLErrors && err.graphQLErrors.map( err => err.message );
			this.setState({ errors: errors });
		});
	}
	onSearchChange = (value) => {
		//this.setState({searching: true, data: []});
		client.query({
	      query: SEARCH_SHOPS_BY_OWNER,
	      variables: { string: value }
	    }).then(({ data }) => {
	    	this.setState({data: data.shopsByOwner, searching: false});
	    }); 
	}
	componentWillMount(){
		client.query({
	      query: FETCH_SHOPS_BY_OWNER,
	    }).then(({ data }) => {
	    	this.setState({data: data.shopsByOwner, searching: false})
	    });
	}
	render(){

		return (
			<View style={{ paddingBottom: 2, flex: 1, backgroundColor: colorConfig.screenBackground }}>
				<SearchBar
				  	onChangeText={this.onSearchChange}
				  	placeholder='Search my listings...'
				  	lightTheme
				  	inputStyle={{ backgroundColor: '#fff' }}
					containerStyle={{ width: SCREEN_WIDTH }}
				/>
				{this.state.searching && <LoadingScreen loadingMessage='loading shops...' />}
				{!this.state.data || this.state.data.length === 0 && <EmptyState imageComponent={<Image source={require('../../assets/search.png')} style={emptyStateIcon}/>} pageText='NO RESULTS...' />}
				<FlatList
				  data={this.state.data}
				  removeClippedSubviews={false}
				  keyExtractor={this.keyExtractor}
				  refreshing={this.state.refreshing}
				  onRefresh={this.onRefresh}
				  onEndReached={this.onEndReached}
				  renderItem={({item}) => {
				  	return <ShopCard item={item} navigation={this.props.navigation} />
				  }}
				/>
				{this.state.searching && (
					<View style={{height: 30}}>
						<ActivityIndicator />
					</View>	
				)}
			</View>		
		);
	}
}



// EXPORT
// ====================================
export default MyListingsScreen;



