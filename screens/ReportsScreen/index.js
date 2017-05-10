import React from 'react';
import { View, FlatList, Text, Platform, Button, Dimensions, TouchableOpacity, ListView, Image, RefreshControl } from 'react-native';
import { Icon, Card, SearchBar } from 'react-native-elements';
import { stylesConfig, colorConfig } from '../../modules/config';
import { userId } from 'meteor-apollo-accounts'
import { FETCH_MESSAGES } from '../../apollo/queries';
import { graphql, withApollo } from 'react-apollo';
//COMMON COMPONENTS
import LoadingScreen from '../../components/LoadingScreen';
import EmptyState from '../../components/EmptyState';
import ReportCard from '../../components/ReportCard';


// CONSTANTS & DESTRUCTURING
// ====================================
const { basicHeaderStyle, titleStyle, regularFont, emptyStateIcon } = stylesConfig;
const SCREEN_WIDTH = Dimensions.get('window').width;



class ReportsList extends React.Component {
	constructor(props) {
	    super(props);

	    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	    this.state = {
	      dataSource: ds.cloneWithRows(props.messages),
	      refreshing: false
	    };
	  }
	  _onRefresh(){
	  	this.setState({refreshing: true})
	  	console.log('refreshing!');
	  	this.setState({refreshing: false})
	  }
	render(){
		return (
			<ListView
				style={{padding: 10, backgroundColor: colorConfig.screenBackground}}
		        dataSource={this.state.dataSource}
		        renderRow={(rowData) => <ReportCard item={rowData} navigation={this.props.navigation} />}
		        refreshControl={
		          <RefreshControl
		            refreshing={this.state.refreshing}
		            onRefresh={this._onRefresh.bind(this)}
		          />
		        }
		      />
			
		);
	}
}

class ReportsScreen extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		title: 'Reports',
		tabBarIcon: ({ tintColor }) => <Icon name="list" size={30} color={tintColor} />,
	  	headerTitleStyle: titleStyle,
	  	headerVisible: Platform.OS !== 'android',
	  	tabBarLabel: 'Reports',
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
	  			title={'+ Create'} 
	  			color={'#fff'} 
	  			onPress={()=>navigation.navigate('addReport')} 
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
		console.log(this.props.data.messages.length);

		this.props.data.fetchMore({
			variables: { offset: this.props.data.messages.length + 1 },
			updateQuery: (previousResult, { fetchMoreResult }) => {
					// Don't do anything if there weren't any new items
					if (!fetchMoreResult || fetchMoreResult.messages.length === 0) {
						return previousResult;
					}

					return {
					// Append the new feed results to the old one
					messages: previousResult.messages.concat(fetchMoreResult.messages),
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
			return <LoadingScreen loadingMessage='loading reports...' />
		}

		if (!this.props.data.messages || this.props.data.messages.length === 0) {
			return (
				<EmptyState 
					imageComponent={
						<Image source={require('../../assets/marketing.png')} style={emptyStateIcon}/>
					}
					pageText='NO REPORTS YET...' 
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
				  data={this.props.data.messages}
				  keyExtractor={this.keyExtractor}
				  refreshing={this.state.refreshing}
				  onRefresh={this.onRefresh}
				  onEndReached={this.onEndReached}
				  renderItem={({item}) => {
				  	return <ReportCard item={item} navigation={this.props.navigation} />
				  }}
				/>
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


export default graphql(FETCH_MESSAGES)(ReportsScreen);



