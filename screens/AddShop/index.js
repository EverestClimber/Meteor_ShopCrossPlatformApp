//TOP LEVEL IMPORTS
import React from 'react';
import { Permissions } from 'expo';
import { View, ScrollView, Platform, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Icon } from 'react-native-elements';
// MODULES
import { stylesConfig, colorConfig } from '../../modules/config';
// COMPONENTS
import BackButton from '../../components/BackButton';
import AddShopForm from '../../components/AddShopForm';


// CONSTANTS & DESTRUCTURING
// ========================================
const { titleStyle, basicHeaderStyle } = stylesConfig;


// NAVIGATION OPTIONS
// ====================================
const navigationOptions = ({ navigation, screenProps }) => ({
		title: 'Add Shop',
		tabBarIcon: ({ tintColor }) => <Icon name="list" size={30} color={tintColor} />,
	  	headerTitleStyle: titleStyle,
	  	headerVisible: Platform.OS !== 'android',
	  	headerStyle: basicHeaderStyle,
	  	tabBarVisible: false,
	  	headerLeft: <BackButton goBack={navigation.goBack} label='' />,
	});


// EXPORTED COMPONENT
// ========================================
class AddShop extends React.Component {

	static navigationOptions = navigationOptions;

	state = { location: null,  errors: [] };

	async componentDidMount() {

		await Permissions.askAsync(Permissions.CAMERA);

	}
	render(){
		return (
			<KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}>
				<ScrollView style={styles.container} contentContainerStyle={styles.contentContainerStyle}>
					<AddShopForm
						location={this.props.screenProps.currentLocation}
						navigation={this.props.navigation}
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
export default AddShop;
