import React from 'react';
import { View, Text, AsyncStorage, Button, ScrollView, StyleSheet, Platform } from 'react-native';
import { Icon, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { AppLoading } from 'expo';
import * as actions from '../../actions';
import ProfileAvatar from '../../components/ProfileAvatar';

//MODULES
import { stylesConfig, colorConfig } from '../../modules/config';
//

//
// ========================================
const { boldFont, semiboldFont, regularFont, titleStyle, basicHeaderStyle } = stylesConfig;



class AccountScreen extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		title: 'Account',
		tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={30} color={tintColor} />,
	  	headerTitleStyle: titleStyle,
	  	headerVisible: Platform.OS !== 'android',
	  	tabBarLabel: 'Account',
	  	headerStyle: basicHeaderStyle,
	  	headerRight: <Button style={{fontFamily: regularFont, fontSize: 10}} title={'Settings'} color={'#fff'} onPress={()=>navigation.navigate('settings')} />,
	});
	render(){
		return (
			<ScrollView style={{padding: 10, backgroundColor: '#f5f5f5'}}>
				<ProfileAvatar {...this.props} />
			</ScrollView>
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


export default connect(null, actions)(AccountScreen);