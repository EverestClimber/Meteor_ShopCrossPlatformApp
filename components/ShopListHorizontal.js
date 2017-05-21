// TOP LEVEL IMPORTS
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Icon, Card } from 'react-native-elements';
// MODULES
import { stylesConfig, colorConfig, DEFAULT_SHOP_IMAGE } from '../modules/config';
// COMPONENTS
import EmptyState from './EmptyState'
import Carousel from 'react-native-snap-carousel';
// REDUX
import { connect } from 'react-redux';
import * as actions from '../actions';



// CONSTANTS & DESTRUCTURING
// ========================================
const { boldFont, semiboldFont,textHeader, basicHeaderStyle, textBody, emptyStateIcon } = stylesConfig;
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.4;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

const sliderWidth = viewportWidth;
const itemWidth = slideWidth + itemHorizontalMargin * 2;



// INTERNAL COMPONENTS
// ========================================
const ShopListCard = ({ item, navigation, currentShopId }) => {
	const onCardPress = () => {
		//if location exists, go to map, if not, do not go to map
		navigation.navigate('shopDetail', { _id: item._id, shopTitle: item.title });
	}
	let activeCardStyles = {flex: 1, padding: 0, borderTopColor: colorConfig.business, borderTopWidth: 5}
	let cardStyles = {flex: 1, padding: 0, borderColor: '#efefef'}

	return (
		<Card containerStyle={item._id === currentShopId ? activeCardStyles : cardStyles}>
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
class ShopListHorizontal extends React.Component {
	componentDidMount(){
		const { data, onCurrentShopChange, currentShopId } = this.props;
		onCurrentShopChange(data.shops[0]._id)
	}
	render(){
		const { data, navigation, onCurrentShopChange, currentShopId } = this.props;

		if (!data || !data.shops || data.shops.length < 0) {
			return <View style={{flex: 1}} />;
		}
		
		
		return (
			<Carousel
				ref={(carousel) => { this._carousel = carousel; }}
				sliderWidth={sliderWidth}
				itemWidth={itemWidth}
				firstItem={0}
				onSnapToItem={i => onCurrentShopChange(data.shops[i]._id)}
				slideStyle={{ width: itemWidth }}
			>
				{ data.shops.map( item => (
					<ShopListCard 
						key={item._id} 
						item={item} 
						navigation={navigation}
						currentShopId={currentShopId}
					/> 
				))}
			</Carousel>
		);

 
	}
}

// REDUX
// ========================================
let mapStateTopProps = ({ mapScreen }) => {
	return {
		currentShopId: mapScreen.currentShopId
	}
}
// EXPORT
// ========================================
export default connect( mapStateTopProps, actions )(ShopListHorizontal);