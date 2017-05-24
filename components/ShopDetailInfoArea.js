// TOP LEVEL IMPORTS
import React from 'react';
import { View, ScrollView, Text, Platform, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon, Button, Card, Badge, Divider } from 'react-native-elements';
//MODULES
import { stylesConfig, colorConfig, DEFAULT_SHOP_IMAGE, SCREEN_WIDTH } from '../modules/config';
import { getCategoryTag } from '../modules/helpers';



// CONSTANTS & DESTRUCTURING
// ========================================
const { 
	basicHeaderStyle, 
	titleStyle, 
	regularFont, 
	textHeader, 
	textSubHeader, 
	textBody 
} = stylesConfig;



// INTERNAL COMPONENTS
// ========================================

const AboutInfo = ({ shopById }) => {

	return (
			<View style={{marginTop: 15}}>
				<Text style={[textSubHeader, {textAlign: 'left', fontSize: 18}]}>
					About this shop
				</Text>
				<Text style={[textBody, {textAlign: 'left', fontSize: 15, marginBottom: 25}]}>
					{shopById.description || ''}
				</Text>
				{shopById.categories && shopById.categories.map(item => (
					<Badge 
						value={item && getCategoryTag(item) || ''}
						key={item} 
						containerStyle={{ backgroundColor: 'violet'}} 
						textStyle={{ color: '#fff' }}
					/>
				))}
				
			</View>
	);
}


const ContactInfo = ({ shopById }) => {

	return (
			<View>
				<Text style={[textSubHeader, {textAlign: 'left', fontSize: 18}]}>
					Contact info
				</Text>
					<Text style={[textBody, {textAlign: 'center'}]}>
					{shopById.phone || ''}
				</Text>
				<Text style={[textBody, {textAlign: 'center'}]}>
					{shopById.email || ''}
				</Text>
				<Text style={[textBody, {textAlign: 'center'}]}>
					{shopById.facebook || ''}
				</Text>
				<Text style={[textBody, {textAlign: 'center'}]}>
					{shopById.twitter || ''}
				</Text>
				<Text style={[textBody, {textAlign: 'center'}]}>
					{shopById.instagram || ''}
				</Text>
				<Text style={[textBody, {textAlign: 'center'}]}>
					{shopById.website || ''}
				</Text>
			</View>
	);
}

const ShopDetailInfoArea = ({ shopById }) => {

	return (
		<View style={{padding: 10, minHeight: 300}}>
			<Text style={[textHeader, {textAlign: 'left', fontSize: 35}]}>
				{shopById.title || ''}
			</Text>
			<AboutInfo 
				shopById={ shopById } 
			/>
			<Divider 
				style={styles.dividerStyle} 
			/>
			<ContactInfo 
				shopById={ shopById }  
			/>
			<Divider 
				style={styles.dividerStyle} 
			/>
		</View>
	);
}



// STYLES
// ========================================
const styles = StyleSheet.create({
	contentContainerStyle: {
		backgroundColor: colorConfig.screenBackground,
		justifyContent: 'flex-start',
	},
	container: {
		flex: 1,
		backgroundColor: colorConfig.screenBackground,
	},
	settingFormItem: {
		flex: 1, justifyContent: 'center', alignItems: 'center'
	},
	dividerStyle: {
		height: 1, 
		backgroundColor: "#e1e8ee",
		marginTop: 20,
		marginBottom: 20
	},
	backButtonContainer: {
	    position: 'absolute',
	    top: 25,
	    left: 5
	  }
});

export default ShopDetailInfoArea;