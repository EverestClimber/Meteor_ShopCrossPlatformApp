//TOP LEVEL IMPORTS
import React from 'react';
import { Permissions } from 'expo';
import { View, Text, ScrollView, Platform, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Icon } from 'react-native-elements';
// MODULES
import { stylesConfig, colorConfig } from '../../modules/config';
// COMPONENTS
import BackButton from '../../components/BackButton';
import EditShopForm from '../../components/EditShopForm';
// APOLLO
import { graphql } from 'react-apollo';
import { FETCH_SHOP } from '../../apollo/queries';
import { SAVE_SHOP } from '../../apollo/mutations';

// CONSTANTS & DESTRUCTURING
// ========================================
const { titleStyle, basicHeaderStyle } = stylesConfig;


// NAVIGATION OPTIONS
// ====================================
const navigationOptions = ({ navigation, screenProps }) => ({
		title: 'Edit Shop',
		tabBarIcon: ({ tintColor }) => <Icon name="list" size={30} color={tintColor} />,
	  	headerTitleStyle: titleStyle,
	  	headerVisible: Platform.OS !== 'android',
	  	headerStyle: basicHeaderStyle,
	  	tabBarVisible: false,
	  	headerLeft: <BackButton goBack={navigation.goBack} label='' />,
	});


// EXPORTED COMPONENT
// ========================================
class EditShop extends React.Component {

	static navigationOptions = navigationOptions;

	state = { location: null,  errors: [] };

	async componentDidMount() {

		await Permissions.askAsync(Permissions.CAMERA);

	}
	render(){

		if (this.props.data.loading) {
			return null
		}

		return (
			<KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}>
				<ScrollView style={styles.container} contentContainerStyle={styles.contentContainerStyle}>
					<EditShopForm 
						shop={this.props.data.shopById} 
						{...this.props} 
					/>
				</ScrollView>
			</KeyboardAvoidingView>
		);
	}
}

// STYLES
// ========================================
const styles = StyleSheet.create({
	contentContainerStyle: {
		backgroundColor: colorConfig.screenBackground,
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingBottom: 50
	},
	container: {
		flex: 1,
		backgroundColor: colorConfig.screenBackground,
		padding: 15,
	},
});

// EXPORT
// ========================================
export default graphql(FETCH_SHOP, {
  options: (props) => { 
  	let variables = { _id: props.navigation.state.params._id };
  	return { variables } 
  }
})(
	graphql(SAVE_SHOP)(EditShop)
);

