import React from 'react';
import { View, Text, AsyncStorage, ScrollView, StyleSheet, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { AppLoading } from 'expo';
import * as actions from '../actions';

import ResourceCard from '../components/ResourceCard';
import { Button, Card, Toast, Container, H2, H3 } from 'native-base';
//MODULES
import { stylesConfig, colorConfig } from '../modules/config';

//
// ========================================
const { boldFont, semiboldFont, regularFont, titleStyle, basicHeaderStyle } = stylesConfig;


const AppSettings = ({ clearLocation, clearLikes }) => {
	return (
		<View style={{marginBottom: 15, flex: 1}}>
			<Text style={styles.headerStyle}>App Settings</Text>
			<Card>
				<Button onPress={()=>clearLocation(()=>{})} transparent>
					<Text style={styles.linkText}>CLEAR LOCATION</Text>
				</Button>
				<Button onPress={()=>clearLikes()} transparent>
					<Text style={styles.linkText}>CLEAR FAVORITES</Text>
				</Button>
			</Card>
		</View>
	);
}

const LegalSettings = ({navigation}) => {
	return (
			<View style={{marginBottom: 15, flex: 1}}>
				<Text style={styles.headerStyle}>Legal</Text>
				<Card>
					<Button onPress={()=>navigation.navigate('terms')} transparent>
						<Text style={styles.linkText}>TERMS & CONDITIONS</Text>
					</Button>
					<Button onPress={()=>navigation.navigate('privacy')} transparent>
						<Text style={styles.linkText}>PRIVACY POLICY</Text>
					</Button>
				</Card>
			</View>
	);
}

const ContactUs = ({ navigation }) => {
	return (
		<View style={{marginBottom: 15, flex: 1}}>
			<Text style={styles.headerStyle}>Contact Us</Text>
			<Button onPress={()=>navigation.navigate('help')} block style={{backgroundColor: '#fff',}}>
				<Text style={{fontFamily: boldFont}}>HELP & SUPPORT</Text>
			</Button>
		</View>
	);
}

class SettingsScreen extends React.Component {
	static navigationOptions = {
		title: 'Settings',
		tabBarIcon: ({ tintColor }) => <Icon name="settings" size={30} color={tintColor} />,
	  	headerTitleStyle: titleStyle,
	  	headerVisible: Platform.OS !== 'android',
	  	tabBarLabel: 'Settings',
	  	headerStyle: basicHeaderStyle
	}
	render(){
		return (
			<Container style={{padding: 10, backgroundColor: '#f5f5f5',}}>
				<AppSettings {...this.props} />
				<ContactUs {...this.props} />
				<LegalSettings {...this.props}  />
			</Container>
		);
	}
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'flex-start',
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


export default connect(null, actions)(SettingsScreen);