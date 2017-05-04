import React from 'react';
import { View, ScrollView, Text, Platform, Button, TouchableOpacity } from 'react-native';
import { Icon, Card } from 'react-native-elements';
import { stylesConfig, colorConfig } from '../../modules/config';
import { userId } from 'meteor-apollo-accounts'
import { FETCH_MESSAGES } from '../../apollo/queries';
import { graphql } from 'react-apollo';


const { basicHeaderStyle, titleStyle, regularFont } = stylesConfig;


const MessageItem = ({ item, navigation }) => {
	return (
		<Card title={item.messageValue} >
			<TouchableOpacity onPress={()=>navigation.navigate('reportDetail', { _id: item._id})}>
            	<Text style={{color: '#888', fontSize: 10}}>{item.messageValue}</Text>
            </TouchableOpacity>
		</Card>
	);
}

class HouseholdsScreen extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		title: 'Households',
		tabBarIcon: ({ tintColor }) => <Icon name="home" size={30} color={tintColor} />,
	  	headerTitleStyle: titleStyle,
	  	headerVisible: Platform.OS !== 'android',
	  	tabBarLabel: 'Households',
	  	headerStyle: basicHeaderStyle,
	  	headerRight: <Button style={{fontFamily: regularFont, fontSize: 10}} title={'+ New'} color={'#fff'} onPress={()=>navigation.navigate('addHousehold')} />,
	});
	render(){
		if (this.props.data.loading) {
			return (
				<View style={{flex: 1, padding: 10, backgroundColor: '#f5f5f5',}}>
					<Text>
						Loading...
					</Text>
				</View>
			);
		}
		return (
			<ScrollView style={{flex: 1, padding: 10, backgroundColor: colorConfig.screenBackground}}>
				{/*this.props.data.messages.map( item => <MessageItem key={item._id} item={item} navigation={this.props.navigation} />)*/}
			</ScrollView>
		);
	}
}


export default graphql(FETCH_MESSAGES)(HouseholdsScreen)