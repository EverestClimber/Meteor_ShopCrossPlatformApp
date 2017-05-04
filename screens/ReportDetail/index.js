import React from 'react';
import { View, Text, Platform } from 'react-native';
import { Icon, Card } from 'react-native-elements';
import { stylesConfig, colorConfig } from '../../modules/config';
import BackButton from '../../components/BackButton';

import { FETCH_MESSAGE } from '../../apollo/queries';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'

const { basicHeaderStyle, titleStyle } = stylesConfig;

class ReportDetail extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		title: 'Report',
		tabBarIcon: ({ tintColor }) => <Icon name="list" size={30} color={tintColor} />,
	  	headerTitleStyle: titleStyle,
	  	headerVisible: Platform.OS !== 'android',
	  	tabBarLabel: 'Report',
	  	tabBarVisible: false,
	  	headerStyle: basicHeaderStyle,
	  	headerLeft: <BackButton goBack={navigation.goBack} label='' />,
	});
	render(){
		if (this.props.data.loading) {
			return (
				<View style={{flex: 1, padding: 10, backgroundColor: colorConfig.screenBackground}}>
					<Text>Loading...</Text>
				</View>
			);
		}
		return (
			<View style={{flex: 1, padding: 10, backgroundColor: colorConfig.screenBackground}}>
				<Card>
					<Text>{this.props.data.getMessageById.messageValue}</Text>
				</Card>
			</View>
		);
	}
}



export default graphql(FETCH_MESSAGE, {
  options: (props) => { 
  	let variables = { _id: props.navigation.state.params._id };
  	return { variables } 
  }
})(ReportDetail);