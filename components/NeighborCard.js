import React from 'react';
import { View, ScrollView, Image, Text, Platform, Button, StyleSheet, TouchableOpacity, ListView, RefreshControl } from 'react-native';
import { Icon, Card } from 'react-native-elements';
import { stylesConfig, colorConfig, DEFAULT_AVATAR } from '../modules/config';
import { getPriorityLevel } from '../modules/helpers';
import { Flex } from 'antd-mobile';

const { basicHeaderStyle, boldFont, titleStyle, regularFont } = stylesConfig;



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


const NeighborCard = ({ item, navigation }) => {
	return (
		<TouchableOpacity onPress={()=>navigation.navigate('neighborDetail', { _id: item._id, firstName: item.profile.firstName})}>
		<Card>
			
				<Flex align='start' style={{marginBottom: 20}}>
					<Flex.Item>
						<Image 
							source={{ uri: item.profile.image || DEFAULT_AVATAR}} 
							style={{height: 65, width: 60}}
						/>
						<Text style={{color: '#888', fontSize: 10}}>
							{item.profile.firstName} {item.profile.lastName}
						</Text>
					</Flex.Item>
				</Flex>
			
		</Card>
		</TouchableOpacity>
	);
}

export default NeighborCard;