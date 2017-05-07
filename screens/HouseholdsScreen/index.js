import React from 'react';
import { View, ScrollView, Text, Platform, Image, Button, TouchableOpacity } from 'react-native';
import { Icon, Card } from 'react-native-elements';
import { stylesConfig, colorConfig, DEFAULT_HOUSEHOLD_IMAGE } from '../../modules/config';
import { userId } from 'meteor-apollo-accounts'
import { FETCH_HOUSEHOLDS } from '../../apollo/queries';
import { graphql } from 'react-apollo';
import LoadingScreen from '../../components/LoadingScreen';

const { basicHeaderStyle, titleStyle, regularFont } = stylesConfig;


const HouseholdCard = ({ item, navigation }) => {
	return (
		<Card title={item.title} >
			<TouchableOpacity onPress={()=>navigation.navigate('householdDetail', { _id: item._id})}>
				<Image 
					source={{ uri: item.image || DEFAULT_HOUSEHOLD_IMAGE }} 
					style={{height: 65, width: 60}}
				/>
            </TouchableOpacity>
		</Card>
	);
}

class HouseholdsScreen extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		title: 'Households',
		tabBarIcon: ({ tintColor }) => <Icon name="home" size={30} color={tintColor} />,
	  	headerTitleStyle: titleStyle,
	  	headerVisible: Platform.OS !== 'android',
	  	tabBarLabel: 'Households',
	  	headerStyle: basicHeaderStyle,
	  	headerRight: <Button style={{fontFamily: regularFont, fontSize: 10}} title={'+ New'} color={'#fff'} onPress={()=>navigation.navigate('addHousehold')} />,
	});
	render(){
		if (this.props.data.loading) {
			return (
				<LoadingScreen />
			);
		}

		return (
			<ScrollView style={{flex: 1, padding: 10, backgroundColor: colorConfig.screenBackground}}>
				{this.props.data.households.map( item => <HouseholdCard key={item._id} item={item} navigation={this.props.navigation} />)}
			</ScrollView>
		);
	}
}


export default graphql(FETCH_HOUSEHOLDS)(HouseholdsScreen);

