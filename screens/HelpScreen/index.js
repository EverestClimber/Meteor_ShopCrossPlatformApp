// TOP LEVEL IMPORTS
import React from 'react';
import { View, Text, Dimensions, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { reduxForm } from 'redux-form'
//MODULES
import { stylesConfig, appConfig, colorConfig } from '../../modules/config';
//COMPONENTS
import ContactUsForm from '../../components/ContactUsForm';
import BackButton from '../../components/BackButton'

// CONSTANTS & DESTRUCTURING
// ====================================
const { appName, supportEmail } = appConfig;
const { boldFont, semiboldFont, regularFont, titleStyle, basicHeaderStyle } = stylesConfig;


// NAVIGATION OPTIONS
// ====================================
const navigationOptions = ({ navigation, screenProps }) => ({
		title: 'Help & Support',
	  	headerTitleStyle: titleStyle, 
	  	headerStyle: basicHeaderStyle,
	  	tabBarVisible: false,
	  	headerLeft: <BackButton goBack={navigation.goBack} label='' />,
	});


// EXPORTED COMPONENT
// ====================================
class HelpScreen extends React.Component {

	static navigationOptions = navigationOptions;

	render(){
		return (
			<View style={styles.container}>
				<ContactUsForm />
			</View>
		);
	}
}


// STYLES
// ====================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: colorConfig.screenBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// EXPORT
// ====================================
export default HelpScreen;