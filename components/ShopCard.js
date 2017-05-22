// TOP LEVEL IMPORTS
import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Card } from 'react-native-elements';
import { Flex } from 'antd-mobile';
// MODULES
import { stylesConfig, colorConfig, DEFAULT_SHOP_IMAGE,  } from '../modules/config';
import { getPriorityLevel, timeAgo, getCategoryTag } from '../modules/helpers';

// CONSTANTS & DESTRUCTURING
// ==========================================
const { basicHeaderStyle, boldFont, titleStyle, regularFont } = stylesConfig;


// STYLES
// ==========================================
const styles = StyleSheet.create({
	groupBadge: {
		height: 9, 
		width: 9,
		marginRight: 5, 
		borderRadius: 50,
	},
	cardHeader: {
		margin: 0, 
		color: '#4b5658', 
		fontSize: 20,
		fontFamily: boldFont
	},
	cardSubHeader: {
		margin: 0, 
		color: '#888', 
		fontSize: 17,
		fontFamily: regularFont
	},
	messageValue: {
		color: '#7b8b8e', 
		fontSize: 13
	}
});


// INTERNAL COMPONENTS
// ==========================================
const CardDescription = ({ item, navigation }) => {
	return (
		<View style={{marginBottom: 20}}>
			<View style={{flex: 3}}>
					<Text style={styles.cardHeader}>{item.title}</Text>
					<View style={{marginTop: 20}}>
						<Text
							ellipsizeMode='tail'
							numberOfLines={5}
							style={styles.description}
						>
							{item.description}
						</Text>
					</View>
			</View>
			<View>
				<Text style={{color: '#888', fontSize: 10}}>
					{item.owner.profile && item.owner.profile.firstName || ''} 
					{item.owner.profile && item.owner.profile.lastName || ''}
				</Text>
			</View>
		</View>
	);
}

const CardBottom = ({item}) => {
	return (
		<View style={{flexDirection:'row', flexWrap:'wrap', alignItems: 'flex-end', justifyContent: 'flex-start'}}>
			<Icon name='label-outline' iconStyle={{ fontSize: 13, marginRight: 5, color: '#bdc3c7' }} />
			{item.categories && item.categories.map(category => {
				return  (
					<Text key={category} style={{ fontSize: 13, color: '#bdc3c7' }}>
						{getCategoryTag(category)  || ''}
					</Text>
				)
			})}
			
		</View>
	);
}



// EXPORTED COMPONENT
// ==========================================
const ShopCard = ({ item, navigation }) => {
	const onCardPress = () => {
		//if location exists, go to map, if not, do not go to map
		navigation.navigate('shopDetail', { _id: item._id, shopTitle: item.title });
	}
	return (
		<Card containerStyle={{minWidth: 250, padding: 0}}>
			<TouchableOpacity onPress={ ()=>onCardPress() } activeOpacity={0.9}>
				<Image 
					source={{ uri: item.image || DEFAULT_SHOP_IMAGE }} 
					style={{flex: 1, minHeight: 150}}
				/>
				<View style={{flex: 2, padding: 10}}>
					<CardDescription item={item}  navigation={navigation} />
					<CardBottom item={item}  />
				</View>
			</TouchableOpacity>
		</Card>
	);
}


// EXPORT
// ==========================================
export default ShopCard;