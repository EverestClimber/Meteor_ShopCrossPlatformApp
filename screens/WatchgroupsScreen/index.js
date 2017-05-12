import React from 'react';
import { View, Text, AsyncStorage, ScrollView, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Icon, Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo'
import { AppLoading } from 'expo';
import * as actions from '../../actions';
//MODULES
import { FETCH_WATCHGROUPS } from '../../apollo/queries';
import { stylesConfig, colorConfig } from '../../modules/config';
import LoadingScreen from '../../components/LoadingScreen';

//
// ========================================
const { 
	basicHeaderStyle, 
	titleStyle, 
	regularFont, 
	textHeader, 
	textSubHeader, 
	textBody 
} = stylesConfig;


const styles = StyleSheet.create({
	groupBadge: {
		height: 15, 
		width: 15,
		marginRight: 5, 
		borderRadius: 50,
	},
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	contactButton: {
		backgroundColor: '#fff',
	}
});


const WatchgroupCard = ({item, navigation}) => {
	return (
		<Card key={item._id}>
			<TouchableOpacity onPress={()=>navigation.navigate('watchgroupDetail', { _id: item._id, group: item.title})}>
				<View style={{display: 'flex', flexDirection: 'row'}}>
					<View style={{flex: 1}}>
						<View style={[{backgroundColor: item.color_id }, styles.groupBadge]} />
					</View>
					<View style={{flex: 5}}>
						<Text style={textHeader}>{item.title}</Text>
					</View>
				</View>
			</TouchableOpacity>
		</Card>
	);
}

class WatchgroupsScreen extends React.Component {
	static navigationOptions = {
		title: 'Groups',
		tabBarIcon: ({ tintColor }) => <Icon name="group-work" size={30} color={tintColor} />,
	  	headerTitleStyle: titleStyle,
	  	headerVisible: Platform.OS !== 'android',
	  	tabBarLabel: 'Groups',
	  	headerStyle: basicHeaderStyle
	}
	render(){
		if (this.props.data.loading) {
			return <LoadingScreen loadingMessage='loading watchgroups...' />
		}

		return (
			<ScrollView style={{padding: 10, backgroundColor: colorConfig.screenBackground}}>
				{this.props.data.watchgroups.map(item => {
					return <WatchgroupCard navigation={this.props.navigation} key={item._id} item={item} />;
				})}
			</ScrollView>
		);
	}
}




export default graphql(FETCH_WATCHGROUPS)(
	connect(null, actions)(WatchgroupsScreen)
);