// TOP LEVEL IMPORTS
import React from 'react';
import { View, Text, Platform, Image, StyleSheet } from 'react-native';
import { Icon, Card } from 'react-native-elements';
// MODULES
import { stylesConfig, colorConfig, DEFAULT_HOUSEHOLD_IMAGE, SCREEN_WIDTH } from '../../modules/config';
// COMPONENTS
import BackButton from '../../components/BackButton';
import LoadingScreen from '../../components/LoadingScreen';
import NeighborCard from '../../components/NeighborCard';
// APOLLO
import { FETCH_HOUSEHOLD_BY_ID } from '../../apollo/queries';
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
class HouseholdDetail extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		title: `Household`,
		tabBarIcon: ({ tintColor }) => <Icon name="list" size={30} color={tintColor} />,
	  	headerTitleStyle: titleStyle,
	  	headerVisible: Platform.OS !== 'android',
	  	tabBarLabel: 'Household',
	  	tabBarVisible: false,
	  	headerStyle: basicHeaderStyle,
	  	headerLeft: <BackButton goBack={navigation.goBack} label='' />,
	});

	renderGeneralArea(){
		const { loading, getHouseholdById } = this.props.data;

		return (
			<Card>
				<View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
					<Image 
						source={{ uri: getHouseholdById.image || DEFAULT_HOUSEHOLD_IMAGE }} 
						style={{height: 105, width: 105}}
					/>
					<Text style={[textHeader, { textAlign: 'center'}]}>
						{getHouseholdById.title || ''}
					</Text>
					<Text style={[textBody, { textAlign: 'center'}]}>
						{getHouseholdById.description || ''}
					</Text>
				</View>
			</Card>
		);

	}
	renderOwnerArea(){
		const { loading, getHouseholdById } = this.props.data;

		return (
			<View>
				<Text style={[textSubHeader, { marginTop: 25, textAlign: 'center', color: colorConfig.darkGrey }]}>
					Household Owner
				</Text>
				<NeighborCard item={getHouseholdById.owner} navigation={this.props.navigation} />
			</View>
		);

	}
	render(){

		const { loading, getHouseholdById } = this.props.data;

		if (loading) { return <LoadingScreen loadingMessage='Loading Household...' /> }

		return (
			<View style={styles.container}>

				{this.renderGeneralArea()}

				{this.renderOwnerArea()}

			</View>
		);

	}
}



// STYLES
// ====================================
const styles = StyleSheet.create({
	container: {
		flex: 1, 
		padding: 10, 
		backgroundColor: colorConfig.screenBackground
	}
});



// EXPORT
// ====================================
export default graphql(FETCH_HOUSEHOLD_BY_ID, {
  options: (props) => { 
  	let variables = { _id: props.navigation.state.params._id };
  	return { variables } 
  }
})(HouseholdDetail);

