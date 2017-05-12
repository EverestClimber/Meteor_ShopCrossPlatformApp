import React from 'react';
import { View, ScrollView, Image, Text, Platform, Button, StyleSheet, TouchableOpacity, ListView, RefreshControl } from 'react-native';
import { Icon, Card } from 'react-native-elements';
import { stylesConfig, colorConfig, DEFAULT_AVATAR } from '../modules/config';
import { getPriorityLevel, timeAgo } from '../modules/helpers';
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



const ReportCardTop = ({ item, navigation }) => {

	const onCardPress = () => {
		//if location exists, go to map, if not, do not go to map
		item.location ? ()=>navigation.navigate('reportDetail', { _id: item._id }) : () => {}
	}


	return (
		<Flex align='start' style={{marginBottom: 20}}>
			
			<Flex.Item style={{flex: 3}}>
					<TouchableOpacity onPress={ ()=>onCardPress() }>
					<Text style={styles.cardHeader}>{item.reportType}</Text>
					<Text style={styles.cardSubHeader}>{getPriorityLevel(item.priorityLevel)}</Text>
					<View style={{marginTop: 20, paddingLeft: 10}}>
						<Text
							ellipsizeMode='tail'
							numberOfLines={5}
							style={styles.messageValue}
						>
							{item.messageValue}
						</Text>
					</View>
				</TouchableOpacity> 
			</Flex.Item>
			
			<Flex.Item>
				<TouchableOpacity 
					onPress={()=>navigation.navigate('neighborDetail', { _id: item.owner._id, firstName: item.owner.profile.firstName})}
				>
					<Image 
						source={{ uri: item.owner.profile.image || DEFAULT_AVATAR }} 
						style={{height: 65, width: 60}}
					/>
				</TouchableOpacity>
				<Text style={{color: '#888', fontSize: 10}}>
					{item.owner.profile.firstName} {item.owner.profile.lastName}
				</Text>
			</Flex.Item>
		</Flex>
	);
}


const ReportCard = ({ item, navigation }) => {
	return (
		<Card containerStyle={{minWidth: 250}}>
			<ReportCardTop item={item}  navigation={navigation} />
			<Flex>
				<Flex.Item>
					<View style={{flexDirection:'row', flexWrap:'wrap', alignItems: 'flex-end', justifyContent: 'flex-start'}}>
						<Icon name='access-time' iconStyle={{ fontSize: 13, marginRight: 5, color: '#bdc3c7' }} />
						<Text style={{ fontSize: 13, color: '#bdc3c7' }}>
							{timeAgo(item.createdAt)}
						</Text>
					</View>
				</Flex.Item>
				<Flex.Item>
					<TouchableOpacity 
						onPress={()=>navigation.navigate('watchgroupDetail', { _id: item.watchgroup._id, group: item.watchgroup.title})}
					>
					<View style={{flexDirection:'row', flexWrap:'wrap', alignItems: 'center', justifyContent: 'flex-end'}}>
						<View style={[{backgroundColor: item.watchgroup.color_id }, styles.groupBadge]} />
						<Text>{item.watchgroup.title}</Text>
					</View>
					</TouchableOpacity>
				</Flex.Item>
			</Flex>
			{/*<TouchableOpacity onPress={()=>navigation.navigate('reportDetail', { _id: item._id})}>
            	<Text style={{color: '#888', fontSize: 10}}>{item.messageValue}</Text>
            </TouchableOpacity>*/}
		</Card>
	);
}

export default ReportCard;