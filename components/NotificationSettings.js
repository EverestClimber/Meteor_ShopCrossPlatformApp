import React from 'react';
import { View, Text, AsyncStorage, Switch, Button, ScrollView, StyleSheet, Platform } from 'react-native';
import { Icon, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { AppLoading } from 'expo';
import * as actions from '../actions';
//APOLLO
import { graphql } from 'react-apollo'
//MODULES
import { FETCH_WATCHGROUPS } from '../apollo/queries';
import { stylesConfig, colorConfig } from '../modules/config';
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



const styles = StyleSheet.create({
	settingFormItem: {
		flex: 1, justifyContent: 'center', alignItems: 'center'
	}
});

const SettingForm = ({ item }) => {
	return (
		<View style={{flex: 1, }}>
			<Card>
				<View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 15}}>
					<Text style={[textHeader,{ textAlign: 'center'}]}> { item.title } </Text>
				</View>
				<View style={{display: 'flex', flexDirection: 'row', marginBottom: 10}}>
					<View style={styles.settingFormItem}>
						<Text style={textSubHeader}>SMS/Text</Text>
					</View>
					<View style={styles.settingFormItem}>
						<Text style={textSubHeader}>Email</Text>
					</View>
					<View style={styles.settingFormItem}>
						<Text style={textSubHeader}>Push</Text>
					</View>
				</View>
				<View style={{display: 'flex', flexDirection: 'row'}}>
					<View style={styles.settingFormItem}>
						<Switch
				          onValueChange={(value) => console.log(value)}
				        />
					</View>
					<View style={styles.settingFormItem}>
						<Switch
				          onValueChange={(value) => console.log(value)}
				        />
					</View>
					<View style={styles.settingFormItem}>
						<Switch
				          onValueChange={(value) => console.log(value)}
				        />
					</View>
				</View>
			</Card>
		</View>
	);
}

const NotificationSettings = ({ watchgroups }) => {
	return (
		<View>
			{watchgroups.map(item => {
				return <SettingForm key={item._id} item={item} />
			})}
		</View>
	);
}


export default NotificationSettings;
