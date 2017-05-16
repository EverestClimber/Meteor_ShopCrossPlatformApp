import React from 'react';
import { Permissions, Location } from 'expo';
import { View, ScrollView, Text, Platform, StyleSheet, Alert } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { stylesConfig, colorConfig } from '../../modules/config';
import BackButton from '../../components/BackButton';
import AddShopForm from '../../components/AddShopForm';



const { boldFont, semiboldFont, regularFont, titleStyle, basicHeaderStyle } = stylesConfig;

class AddShop extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		title: 'Add Shop',
		tabBarIcon: ({ tintColor }) => <Icon name="list" size={30} color={tintColor} />,
	  	headerTitleStyle: titleStyle,
	  	headerVisible: Platform.OS !== 'android',
	  	headerStyle: basicHeaderStyle,
	  	tabBarVisible: false,
	  	headerLeft: <BackButton goBack={navigation.goBack} label='' />,
	});

	state = { 
		location: null, 
		errors: [],
	}
	async componentDidMount() {

		const cameraResponse = await Permissions.askAsync(Permissions.CAMERA);
		console.log(cameraResponse)

		const locationResponse = await Permissions.askAsync(Permissions.LOCATION);

		if (locationResponse.status === 'granted') {
			this.setState({locationPermissions: true})
			let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
			this.setState({location})
		} else { throw new Error('Location permission not granted'); }

	}
	render(){
		return (
			<ScrollView
				style={styles.container}
				contentContainerStyle={styles.contentContainerStyle}
			>
				<AddShopForm
					location={this.state.location}
					navigation={this.props.navigation}
				/>
			</ScrollView>
		);
	}
}

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
  linkText: {
  	color: colorConfig.business,
	fontSize: 15,
	fontFamily: boldFont,
  },
	headerStyle: {
		marginBottom: 6, 
		color: '#000',
		fontSize: 20,
		fontFamily: semiboldFont
	},
	subHeaderStyle: {
		fontFamily: regularFont,
		textAlign: 'center', 
		color: '#888'
	},
	contactButton: {
		backgroundColor: '#fff',
	}
});

export default AddShop;