// TOP LEVEL IMPORTS
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Icon, Card } from 'react-native-elements';
// MODULES
import { stylesConfig, colorConfig, DEFAULT_SHOP_IMAGE } from '../modules/config';


// CONSTANTS & DESTRUCTURING
// ========================================
const { boldFont, semiboldFont,textHeader, basicHeaderStyle, textBody } = stylesConfig;



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


const ShopListHorizontal = (props) => {
	return (
    	<ScrollView horizontal style={{flex: 1}}>
    		{props.navigation.state.params.data.map( item => {
    			return (
    				<ShopListCard key={item._id} item={item} {...props} />
    			);
    		})}
    	</ScrollView>
	);
}



export default ShopListHorizontal;