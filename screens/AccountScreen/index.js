// TOP LEVEL IMPORTS
import React from 'react';
import { View, Text, AsyncStorage, Switch, Button, ScrollView, StyleSheet, Platform } from 'react-native';
import { Icon, Card } from 'react-native-elements';
import { Tabs, WhiteSpace,  } from 'antd-mobile';
import { AppLoading } from 'expo';
// REDUX
import { connect } from 'react-redux';
import * as actions from '../../actions';
//APOLLO
import { graphql } from 'react-apollo';
import { FETCH_WATCHGROUPS } from '../../apollo/queries';
//MODULES
import { stylesConfig, colorConfig } from '../../modules/config';
// COMPONENTS
import ProfileAvatar from '../../components/ProfileAvatar';
import LoadingScreen from '../../components/LoadingScreen';
import AccountForm from '../../components/AccountForm';



// CONSTANTS & DESTRUCTURING
// ========================================
const { 
	boldFont, 
	semiboldFont, regularFont,
	basicHeaderStyle, 
	titleStyle, 
	textHeader, 
	textSubHeader, 
	textBody 
} = stylesConfig;

const TabPane = Tabs.TabPane;


// NAVIGATION OPTIONS
// ====================================
const navigationOptions = ({ navigation, screenProps }) => ({
		title: 'Account',
		tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={30} color={tintColor} />,
	  	headerTitleStyle: titleStyle,
	  	headerVisible: Platform.OS !== 'android',
	  	tabBarLabel: 'Account',
	  	headerStyle: basicHeaderStyle,
	  	headerRight: <Button style={{fontFamily: regularFont, fontSize: 10}} title={'Settings'} color={'#fff'} onPress={()=>navigation.navigate('settings')} />,
	});


// EXPORTED COMPONENT
// ========================================
class AccountScreen extends React.Component {
	static navigationOptions = navigationOptions;
	render(){

		if (this.props.screenProps.data.loading) {
			return <LoadingScreen />;
		}

		if (!this.props.screenProps.data|| !this.props.screenProps.data.user) {
			return (
				<ScrollView style={{padding: 10, backgroundColor: '#f5f5f5'}}>
				</ScrollView>
			);
		}

		return (
			<ScrollView style={styles.container} contentContainerStyle={styles.contentContainerStyle}>
				<AccountForm
					{...this.props} 
				/>
			</ScrollView>
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
	},
	container: {
		flex: 1,
		backgroundColor: colorConfig.screenBackground,
		padding: 15,
	},
	settingFormItem: {
		flex: 1, justifyContent: 'center', alignItems: 'center'
	}
});

// EXPORT
// ========================================
export default connect(null, actions)(AccountScreen);


