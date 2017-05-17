//TOP LEVEL IMPORTS
import React from 'react';
import { View, Text, AsyncStorage, ScrollView, StyleSheet, Platform } from 'react-native';
//COMPONENTS
import { Icon, Button, Card } from 'react-native-elements';
import BackButton from '../../components/BackButton';
import PrivacyArea from './PrivacyArea'
//MODULES
import { stylesConfig, colorConfig, appConfig } from '../../modules/config';


// CONSTANTS & DESTRUCTURING
// ====================================
const { appName, supportEmail } = appConfig;
const { boldFont, semiboldFont, regularFont, titleStyle, basicHeaderStyle } = stylesConfig;


// EXPORTED COMPONENT
// ====================================
class PrivacyPolicyScreen extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		title: 'Privacy Policy',
		tabBarIcon: ({ tintColor }) => <Icon name="public" size={30} color={tintColor} />,
	  	headerTitleStyle: titleStyle, 
	  	headerStyle: basicHeaderStyle,
	  	tabBarVisible: false,
	  	headerLeft: <BackButton goBack={navigation.goBack} label='' />,
	});
	render(){
		return (
			<ScrollView style={styles.container}>
				<PrivacyArea />
			</ScrollView>
		);
	}
}


// STYLES
// ====================================
const styles = StyleSheet.create({
  container: {
    backgroundColor: colorConfig.screenBackground,
  },
});



// EXPORT
// ====================================
export default PrivacyPolicyScreen;