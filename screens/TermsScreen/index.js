// TOP LEVEL IMPORTS
import React from 'react';
import { View, Text, AsyncStorage, ScrollView, StyleSheet, Platform } from 'react-native';
import { Icon, Button, Card } from 'react-native-elements';
//COMPONENTS
import BackButton from '../../components/BackButton'
import TermsArea from './TermsArea';
//MODULES
import { stylesConfig, colorConfig, appConfig } from '../../modules/config';


// CONSTANTS & DESTRUCTURING
// ====================================
const { appName } = appConfig;
const { screenBackground } = colorConfig;
const { boldFont, semiboldFont, regularFont, titleStyle, basicHeaderStyle } = stylesConfig;



// EXPORTED COMPONENT
// ====================================
class TermsScreen extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		title: 'Terms & Conditions',
		tabBarIcon: ({ tintColor }) => <Icon name="public" size={30} color={tintColor} />,
	  	headerTitleStyle: titleStyle,
	  	headerStyle: basicHeaderStyle,
	  	//tabBarVisible: false,
	  	headerLeft: <BackButton goBack={navigation.goBack} label='' />,
	});

	onClearLocation = (item) => {
		this.props.clearLocation();
	}
	render(){
		return (
			<ScrollView style={styles.container}>
				<TermsArea />
			</ScrollView>
		);
	}
}


// STYLES
// ====================================
const styles = StyleSheet.create({
  container: {
    backgroundColor: screenBackground,
  },
  header: {
  	fontSize: 17,
  	marginBottom: 7,
  	fontFamily: semiboldFont
  },
  textStyle: {
  	marginBottom: 4,
  }
});


// EXPORT
// ====================================
export default TermsScreen;

