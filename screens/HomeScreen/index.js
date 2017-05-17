// TOP LEVEL IMPORTS
import React from 'react';
import { View, FlatList, Text, Platform, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { Icon, Card, SearchBar, Button } from 'react-native-elements';
import { Permissions, Location, MapView, DangerZone } from 'expo';
// MODULES
import { stylesConfig, colorConfig, SCREEN_WIDTH } from '../../modules/config';
// APOLLO
import { userId } from 'meteor-apollo-accounts'
import { FETCH_SHOPS } from '../../apollo/queries';
import { graphql, withApollo } from 'react-apollo';
import client from '../../ApolloClient';
// COMPONENTS
import LoadingScreen from '../../components/LoadingScreen';
import EmptyState from '../../components/EmptyState';
import ShopCard from '../../components/ShopCard';


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
	  	/*headerLeft: (
	  		<Icon
	  			name="search" 
	  			color={'#fff'}
	  			iconStyle={{marginLeft: 15}}
	  			onPress={()=>navigation.navigate('search')} 
	  		/>
	  	),*/
	  	/*headerRight: (
	  		<Button
	  			backgroundColor={colorConfig.business}
	  			fontFamily={regularFont}
	  			title={'+ Add Shop'} 
	  			color={'#fff'} 
	  			onPress={()=>navigation.navigate('addShop')} 
	  		/>
	  	),*/
	});


// EXPORTED COMPONENT
// ====================================
class HomeScreen extends React.Component {

	static navigationOptions = navigationOptions;

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
		if (this.props.data.shops.length < 10) { 
			//if there are less than 10 resuls on the screen, 
			// there are no more results in the DB (as it sends 10 at a time)
			return console.log('more more results'); 
		}
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
				<SearchBar
				  	onChangeText={()=>{}}
				  	placeholder='Search shops...'
				  	lightTheme
				  	inputStyle={{ backgroundColor: '#fff' }}
					containerStyle={{ width: SCREEN_WIDTH }}
				/>
				<FlatList
				  data={this.props.data.shops}
				  keyExtractor={this.keyExtractor}
				  refreshing={this.state.refreshing}
				  onRefresh={this.onRefresh}
				  onEndReached={this.onEndReached}
				  removeClippedSubviews={false}
				  renderItem={({item}) => <ShopCard item={item} navigation={this.props.navigation} />}
				/>
				{this.props.data.networkStatus === 4 && (
					<View style={{height: 30}}>
						<ActivityIndicator />
					</View>	
				)}
				<View style={styles.buttonContainer}>
					<View style={styles.buttonInsideContainer}>
								<Button
						            buttonStyle={{borderRadius: 50, width: 70}}
						            backgroundColor={'#fff'}
						            title="MAP"
						            color={'#000'}
						            iconRight
						            textStyle={{fontSize: 12}}
						            icon={{ name: 'map', color: '#000'}}
						            onPress={()=>this.props.navigation.navigate('map', { data: this.props.data.shops})}
					        	/>
								<Button
					        		buttonStyle={{borderRadius: 50, width: 70}}
						            backgroundColor={'#fff'}
						            title="FILTER"
						            color={'#000'}
						            textStyle={{fontSize: 12}}
						            iconRight
						            icon={{ name: 'filter-list', color: '#000'}}
						            onPress={()=>this.props.navigation.navigate('filters', { data: this.props.data.shops})}
					        	/>
						</View>
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


// EXPORT
// ====================================
export default graphql(FETCH_SHOPS, {
	options: {
		//notifyOnNetworkStatusChange: true,
	}
})(HomeScreen);



