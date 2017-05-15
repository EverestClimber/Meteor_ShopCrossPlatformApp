import React from 'react';
import { View, Text, AsyncStorage, Switch, Button, ScrollView, StyleSheet, Platform } from 'react-native';
import { Icon, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { AppLoading } from 'expo';
import * as actions from '../../actions';
import ProfileAvatar from '../../components/ProfileAvatar';
import LoadingScreen from '../../components/LoadingScreen';
import AccountForm from '../../components/AccountForm';
import NotificationSettings from '../../components/NotificationSettings';

//APOLLO
import { graphql } from 'react-apollo'
//MODULES
import { FETCH_WATCHGROUPS } from '../../apollo/queries';
import { stylesConfig, colorConfig } from '../../modules/config';
//
import { Tabs, WhiteSpace,  } from 'antd-mobile';
//
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

		if (this.props.screenProps.data.loading) {
			return (
				<LoadingScreen />
			);
		}
		if (!this.props.screenProps.data|| !this.props.screenProps.data.user) {
			return (
				<ScrollView style={{padding: 10, backgroundColor: '#f5f5f5'}}>
				</ScrollView>
			);
		}
		//style={styles.container}
		//contentContainerStyle={styles.contentContainerStyle}
		return (
			<ScrollView style={styles.container} contentContainerStyle={styles.contentContainerStyle}>
				<AccountForm
					{...this.props} 
				/>
				{/*<Tabs defaultActiveKey="1"
					textColor={colorConfig.darkGrey}
					activeTextColor={colorConfig.business}
					activeUnderlineColor={colorConfig.business} 
					underlineColor={colorConfig.lightGrey}
					barStyle={{backgroundColor: '#fff'}}
				>
			      <TabPane tab="Account" key="1">
			      		<ScrollView contentContainerStyle={styles.contentContainerStyle}>
				      		<ProfileAvatar {...this.props} />
							
						</ScrollView>
			      </TabPane>
			      <TabPane tab="Notifcations" key="2">
			      	<ScrollView>
			      		<NotificationSettings
							watchgroups={this.props.data.watchgroups}
						/>
			      	</ScrollView>
			      </TabPane>
			    </Tabs>*/}
				
				
				
			
			</ScrollView>
		);
	}
}




export default connect(null, actions)(AccountScreen);


