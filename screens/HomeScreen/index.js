import React from 'react';
import { View, Text, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import { stylesConfig } from '../../modules/config';
import { userId } from 'meteor-apollo-accounts'

const { basicHeaderStyle, titleStyle } = stylesConfig;

class HomeScreen extends React.Component {
	static navigationOptions = {
		title: 'Home',
		tabBarIcon: ({ tintColor }) => <Icon name="home" size={30} color={tintColor} />,
	  	headerTitleStyle: titleStyle, 
	  	tabBarLabel: 'Home',
	  	headerVisible: true, //Platform.OS !== 'android',
	  	headerStyle: basicHeaderStyle
	};
	render(){
		
		return (
			<View style={{flex: 1, padding: 10, backgroundColor: '#f5f5f5',}}>
			</View>
		);
	}
}


export default HomeScreen