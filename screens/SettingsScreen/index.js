// TOP LEVEL IMPORTS
import React from 'react';
import { View, Text, AsyncStorage, ScrollView, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Icon, Button, Card } from 'react-native-elements';
import { AppLoading } from 'expo';
// APOLLO
import ApolloClient from '../../ApolloClient';
import { logout } from 'meteor-apollo-accounts';
// REDUX
import { connect } from 'react-redux';
import * as actions from '../../actions';
// MODULES
import { stylesConfig, colorConfig } from '../../modules/config';
// COMPONENTS
import BackButton from '../../components/BackButton';
import ChangePassword from '../../components/ChangePassword';



// CONSTANTS & DESTRUCTURING
// ========================================
const { boldFont, semiboldFont, regularFont, titleStyle, basicHeaderStyle } = stylesConfig;


// INTERNAL COMPONENTS
// ========================================
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
					<TouchableOpacity onPress={()=>navigation.navigate('terms')}>
		            	<Text style={styles.linkText}>TERMS & CONDITIONS</Text>
		            </TouchableOpacity>
					<TouchableOpacity onPress={()=>navigation.navigate('privacy')}>
		            	<Text style={styles.linkText}>PRIVACY POLICY</Text>
		            </TouchableOpacity>
		            <TouchableOpacity onPress={()=>AsyncStorage.removeItem('onboardingComplete')}>
		            	<Text style={styles.linkText}>RESET ONBOARDING</Text>
		            </TouchableOpacity>

		            
				</Card>
			</View>
	);
}

const ContactUs = ({ navigation }) => {
	return (
		<View style={{marginBottom: 15, flex: 1}}>
			<Text style={styles.headerStyle}>Contact Us</Text>
			<View>
				<Button 
		          title='HELP & SUPPORT'
		          backgroundColor={colorConfig.business} 
		          onPress={() => navigation.navigate('help')}
		          style={{marginTop: 10}} 
		        />
			</View>
		</View>
	);
}

const ChangePasswordArea = ({ navigation }) => {
	return (
		<View style={{marginBottom: 25, flex: 1}}>
			<Text style={styles.headerStyle}>Change Password</Text>
			<ChangePassword {...this.props}  />
		</View>
	);
}



// EXPORTED COMPONENT
// ========================================
class SettingsScreen extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		title: 'Settings',
		tabBarIcon: ({ tintColor }) => <Icon name="settings" size={30} color={tintColor} />,
	  	headerTitleStyle: titleStyle,
	  	headerVisible: Platform.OS !== 'android',
	  	tabBarVisible: false,
	  	headerStyle: basicHeaderStyle,
	  	headerLeft: <BackButton goBack={navigation.goBack} label='' />,
	});
	handleLogout = () => {
		logout(ApolloClient).then( res => {
			this.props.navigation.navigate('auth')
			ApolloClient.resetStore();
		});
	}
	render(){
		return (
			<ScrollView style={{padding: 10, backgroundColor: '#f5f5f5'}}>
				{/*<AppSettings {...this.props} />*/}
				<ContactUs {...this.props} />
				<LegalSettings {...this.props}  />
				
				<ChangePasswordArea {...this.props} />
				
				<View>
					<Button 
			          title='LOG OUT'
			          backgroundColor={colorConfig.business} 
			          onPress={this.handleLogout}
			          style={{marginTop: 10}} 
			        />
				</View>
			</ScrollView>
		);
	}
}



// STYLES
// ========================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorConfig.screenBackground,
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


// EXPORT
// ========================================
export default connect(null, actions)(SettingsScreen);