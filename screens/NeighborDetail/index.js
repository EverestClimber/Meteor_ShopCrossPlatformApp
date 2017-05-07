import React from 'react';
import { View, Text, Platform } from 'react-native';
import { Icon, Card } from 'react-native-elements';
import { stylesConfig, colorConfig } from '../../modules/config';
import BackButton from '../../components/BackButton';
import LoadingScreen from '../../components/LoadingScreen';
import { FETCH_USER_BY_ID } from '../../apollo/queries';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'

const { basicHeaderStyle, titleStyle } = stylesConfig;

class NeighborDetail extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		title: `${navigation.state.params.firstName}`,
		tabBarIcon: ({ tintColor }) => <Icon name="list" size={30} color={tintColor} />,
	  	headerTitleStyle: titleStyle,
	  	headerVisible: Platform.OS !== 'android',
	  	tabBarLabel: 'NeighborDetail',
	  	tabBarVisible: false,
	  	headerStyle: basicHeaderStyle,
	  	headerLeft: <BackButton goBack={navigation.goBack} label='' />,
	});
	render(){
		const { data } = this.props;

		if (data.loading) {
			return (
				<LoadingScreen loadingMessage='Loading Profile...' />
			);
		}

		return (
			<View style={{flex: 1, padding: 10, backgroundColor: colorConfig.screenBackground}}>
				<Card>
					<Text>{data.getUserById.profile.firstName} {data.getUserById.profile.lastName}</Text>
				</Card>
			</View>
		);
	}
}



export default graphql(FETCH_USER_BY_ID, {
  options: (props) => { 
  	let variables = { _id: props.navigation.state.params._id };
  	return { variables } 
  }
})(NeighborDetail);