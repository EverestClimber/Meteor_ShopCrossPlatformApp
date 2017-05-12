// TOP LEVEL IMPORTS
import React from 'react';
import { View, Text, Platform, Image } from 'react-native';
import { Icon, Card } from 'react-native-elements';
// MODULES
import { stylesConfig, colorConfig, DEFAULT_AVATAR } from '../../modules/config';
// COMPONENTS
import BackButton from '../../components/BackButton';
import LoadingScreen from '../../components/LoadingScreen';
// APOLLO
import { FETCH_USER_BY_ID } from '../../apollo/queries';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'


// CONSTANTS & DESTRUCTURING
// ====================================
const { 
	basicHeaderStyle, 
	titleStyle,
	regularFont, 
	textHeader, 
	textSubHeader, 
	textBody 
} = stylesConfig;



// EXPORTED COMPONENT
// ====================================
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
					<View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
						<Image 
							source={{ uri: data.getUserById.profile.image || DEFAULT_AVATAR }} 
							style={{ height: 105, width: 105 }}
						/>
						<Text style={[textHeader, { textAlign: 'center', marginTop: 15}]}>
							{data.getUserById.profile.firstName} {data.getUserById.profile.lastName}
						</Text>
					</View>
				</Card>
			</View>
		);
	}
}


// EXPORT
// ====================================
export default graphql(FETCH_USER_BY_ID, {
  options: (props) => { 
  	let variables = { _id: props.navigation.state.params._id };
  	return { variables } 
  }
})(NeighborDetail);