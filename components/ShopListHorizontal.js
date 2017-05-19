// TOP LEVEL IMPORTS
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Icon, Card } from 'react-native-elements';
// MODULES
import { stylesConfig, colorConfig, DEFAULT_SHOP_IMAGE } from '../modules/config';
// COMPONENTS
import EmptyState from './EmptyState'



// CONSTANTS & DESTRUCTURING
// ========================================
const { boldFont, semiboldFont,textHeader, basicHeaderStyle, textBody, emptyStateIcon } = stylesConfig;


// INTERNAL COMPONENTS
// ========================================
const ShopListCard = ({ item, navigation }) => {
	const onCardPress = () => {
		//if location exists, go to map, if not, do not go to map
		navigation.navigate('shopDetail', { _id: item._id, shopTitle: item.title });
	}
	return (
		<Card containerStyle={{width: 150, padding: 0}}>
			<TouchableOpacity onPress={() => onCardPress()} activeOpacity={0.9}>
				<Image 
					source={{ uri: item.image || DEFAULT_SHOP_IMAGE }} 
					style={{flex: 1, minHeight: 100}}
				/>
				<View style={{padding: 10}}>
					<Text style={textHeader}>{item.title}</Text>
				</View>
			</TouchableOpacity>
		</Card>
	);
}


// EXPORTED COMPONENT
// ========================================
const ShopListHorizontal = ({ data, navigation }) => {

	if (!data || !data.shops || data.shops.length < 0) {
		return <View style={{flex: 1}} />;
	}

	return (
    	<ScrollView horizontal style={{flex: 1}}>
    		{ data.shops.map( item => <ShopListCard key={item._id} item={item} navigation={navigation} /> ) }
    	</ScrollView>
	);
}


// EXPORT
// ========================================
export default ShopListHorizontal;