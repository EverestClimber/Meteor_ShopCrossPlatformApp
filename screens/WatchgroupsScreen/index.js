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
const { boldFont, semiboldFont, regularFont, titleStyle, basicHeaderStyle } = stylesConfig;


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
	},
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  linkText: {
  	color: colorConfig.business,
	fontSize: 15,
	fontFamily: boldFont,
  },
	headerStyle: {
		marginBottom: 6, 
		color: '#000',
		fontSize: 20,
		fontFamily: semiboldFont
	},
	subHeaderStyle: {
		fontFamily: regularFont,
		textAlign: 'center', 
		color: '#888'
	},
	contactButton: {
		backgroundColor: '#fff',
	}
});


const WatchgroupCard = ({item, navigation}) => {
	return (
		<Card key={item._id}>
			<TouchableOpacity onPress={()=>navigation.navigate('watchgroupDetail', { _id: item._id, group: item.title})}>
				<View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
					<View style={[{backgroundColor: item.color_id }, styles.groupBadge]} />
					<Text>{item.title}</Text>
				</View>
			</TouchableOpacity>
		</Card>
	);
}

class WatchgroupsScreen extends React.Component {
	static navigationOptions = {
		title: 'Groups',
		tabBarIcon: ({ tintColor }) => <Icon name="group" size={30} color={tintColor} />,
	  	headerTitleStyle: titleStyle,
	  	headerVisible: Platform.OS !== 'android',
	  	tabBarLabel: 'Groups',
	  	headerStyle: basicHeaderStyle
	}
	render(){
		if (this.props.data.loading) {
			return <LoadingScreen loadingMessage='loading watchgroups...' />
		}
		console.log(this.props.data.watchgroups)
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