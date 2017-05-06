import React from 'react';
import { View, ScrollView, Text, Platform, Button, TouchableOpacity, ListView, RefreshControl } from 'react-native';
import { Icon, Card } from 'react-native-elements';
import { stylesConfig, colorConfig } from '../../modules/config';
import { userId } from 'meteor-apollo-accounts'
import { FETCH_MESSAGES } from '../../apollo/queries';
import { graphql } from 'react-apollo';
//import { ListView } from 'antd-mobile'
import LoadingScreen from '../../components/LoadingScreen';
const { basicHeaderStyle, titleStyle, regularFont } = stylesConfig;

import ReportCard from '../../components/ReportCard';

/*const MessageItem = ({ item, navigation }) => {
	return (
		<Card title={item.messageValue} >
			<TouchableOpacity onPress={()=>navigation.navigate('reportDetail', { _id: item._id})}>
            	<Text style={{color: '#888', fontSize: 10}}>{item.messageValue}</Text>
            </TouchableOpacity>
		</Card>
	);
}*/


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
	  	headerRight: <Button style={{fontFamily: regularFont, fontSize: 10}} title={'+ Create'} color={'#fff'} onPress={()=>navigation.navigate('addReport')} />,
	});
	
	render(){
		if (this.props.data.loading) {
			return <LoadingScreen loadingMessage='loading reports...' />
		}
		return (
			<ReportsList
		        messages={this.props.data.messages}
		        {...this.props}
		     />
			
		);
	}
}

//<ListView style={{flex: 1, padding: 10, backgroundColor: colorConfig.screenBackground}}>
//				{this.props.data.messages.map( item => <MessageItem key={item._id} item={item} navigation={this.props.navigation} />)}
//			</ListView>


export default graphql(FETCH_MESSAGES)(ReportsScreen)