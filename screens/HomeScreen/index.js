// TOP LEVEL IMPORTS
import React from 'react';
import { View, FlatList, Text, Platform, Button, Dimensions, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Icon, Card, SearchBar } from 'react-native-elements';
// MODULES
import { stylesConfig, colorConfig, SCREEN_WIDTH } from '../../modules/config';
// APOLLO
import { userId } from 'meteor-apollo-accounts'
import { FETCH_SHOPS } from '../../apollo/queries';
import { graphql, withApollo } from 'react-apollo';
//COMMON COMPONENTS
import LoadingScreen from '../../components/LoadingScreen';
import EmptyState from '../../components/EmptyState';
import ShopCard from '../../components/ShopCard';


// CONSTANTS & DESTRUCTURING
// ====================================
const { basicHeaderStyle, titleStyle, regularFont, emptyStateIcon } = stylesConfig;





class HomeScreen extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		title: 'Home',
		tabBarIcon: ({ tintColor }) => <Icon name="home" size={30} color={tintColor} />,
	  	headerTitleStyle: titleStyle,
	  	headerVisible: Platform.OS !== 'android',
	  	tabBarLabel: 'Home',
	  	headerStyle: basicHeaderStyle,
	  	headerLeft: (
	  		<Icon
	  			name="search" 
	  			color={'#fff'}
	  			iconStyle={{marginLeft: 15}}
	  			onPress={()=>navigation.navigate('search')} 
	  		/>
	  	),
	  	headerRight: (
	  		<Button 
	  			style={{fontFamily: regularFont, fontSize: 10}} 
	  			title={'+ Add Shop'} 
	  			color={'#fff'} 
	  			onPress={()=>navigation.navigate('addShop')} 
	  		/>
	  	),
	});
	constructor(props){
		super(props);
		this.onEndReached = this.onEndReached.bind(this);
		this.state = { refreshing: false }
	}
	
	keyExtractor(item, index){
		return item._id;
	}
	onRefresh = () => {
		this.setState({refreshing: true})
		setTimeout(()=>this.setState({refreshing: false}), 1500)
	}
	onEndReached(){
		console.log(this.props.data.shops.length);

		this.props.data.fetchMore({
			variables: { offset: this.props.data.shops.length },
			updateQuery: (previousResult, { fetchMoreResult }) => {
					// Don't do anything if there weren't any new items
					if (!fetchMoreResult || fetchMoreResult.shops.length === 0) {
						return previousResult;
					}

					return {
					// Append the new feed results to the old one
					shops: previousResult.shops.concat(fetchMoreResult.shops),
					};
			},
		}).catch(err => {
			console.log('error ran')
			const errors = err && err.graphQLErrors && err.graphQLErrors.map( err => err.message );
			console.log(errors)
			this.setState({ errors: errors });
		});
	}
	render(){

		if (this.props.data.loading) {
			return <LoadingScreen loadingMessage='loading shops...' />
		}

		if (!this.props.data.shops || this.props.data.shops.length === 0) {
			return (
				<EmptyState 
					imageComponent={
						<Image source={require('../../assets/marketing.png')} style={emptyStateIcon}/>
					}
					pageText='NO SHOPS YET...' 
				/>
			);
		}


		return (
			<View style={{ paddingBottom: 2, flex: 1, backgroundColor: colorConfig.screenBackground }}>
				{/*<SearchBar
				  onChangeText={()=>{}}
				  placeholder='Search reports...'
				  lightTheme
				  inputStyle={{ backgroundColor: '#fff' }}
				  containerStyle={{ width: SCREEN_WIDTH, backgroundColor: colorConfig.business }}
				/>*/}
				<FlatList
				  data={this.props.data.shops}
				  keyExtractor={this.keyExtractor}
				  refreshing={this.state.refreshing}
				  onRefresh={this.onRefresh}
				  onEndReached={this.onEndReached}
				  renderItem={({item}) => {
				  	//return <View><Text>{item.title}</Text></View>
				  	return <ShopCard item={item} navigation={this.props.navigation} />
				  }}
				/>
				{this.props.data.networkStatus === 4 && (
					<View style={{height: 30}}>
						<ActivityIndicator />
					</View>	
				)}
			</View>		
		);
	}
}



/*{
	"data":{
		"variables":{},
		"loading":false,
		"networkStatus":7,
		"user":{
			"emails":[{"address":"arcomito@gmail.com","verified":false,"__typename":"Email"}],
			"roles":null,
			"_id":"vDvicBgXbPodjxw7w",
			"profile":{"watchgroupIds":["Apps6cahtuLkcnShu","pJsYzscT3dsG2DiDb","KkahyirQ5p7maLNsF"],"firstName":"Anthony","lastName":"Comito","cell":"5555555","cellVisibility":"show","gender":"other","image":"https://veg-corp.s3.amazonaws.com/vDvicBgXbPodjxw7w/1494248420002/Business-Headshot-Gray.jpg","__typename":"Profile"},"__typename":"User"
		}
	}
}
*/
//<ListView style={{flex: 1, padding: 10, backgroundColor: colorConfig.screenBackground}}>
//				{this.props.data.messages.map( item => <MessageItem key={item._id} item={item} navigation={this.props.navigation} />)}
//			</ListView>


export default graphql(FETCH_SHOPS, {
	options: {
		//notifyOnNetworkStatusChange: true,
	}
})(HomeScreen);



