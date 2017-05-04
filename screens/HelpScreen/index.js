import React from 'react';
import { View, Text, Dimensions, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { reduxForm } from 'redux-form'
//MODULES
import { stylesConfig, appConfig, colorConfig } from '../../modules/config';
//COMPONENTS
import ContactUsForm from '../../components/ContactUsForm';
import BackButton from '../../components/BackButton'


const { appName, supportEmail } = appConfig;
const { boldFont, semiboldFont, regularFont, titleStyle, basicHeaderStyle } = stylesConfig;

class HelpScreen extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		title: 'Help & Support',
	  	headerTitleStyle: titleStyle, 
	  	headerStyle: basicHeaderStyle,
	  	tabBarVisible: false,
	  	headerLeft: <BackButton goBack={navigation.goBack} label='' />,
	});

	render(){
		return (
			<View style={styles.container}>
				<ContactUsForm />
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: colorConfig.screenBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default HelpScreen;