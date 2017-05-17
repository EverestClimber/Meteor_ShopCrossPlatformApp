// TOP LEVEL IMPORTS
import React from 'react';
import { View, ScrollView, Text, Platform, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon, Button, Card } from 'react-native-elements';
import { Tabs, WhiteSpace,  } from 'antd-mobile';
//MODULES
import { stylesConfig, colorConfig, DEFAULT_SHOP_IMAGE, SCREEN_WIDTH } from '../../modules/config';
// APOLLO
import { graphql } from 'react-apollo';
import { FETCH_SHOP } from '../../apollo/queries';
// COMPONENTS
import LoadingScreen from '../../components/LoadingScreen';
import ShopCard from '../../components/ShopCard';
import BackButton from '../../components/BackButton';
import EmptyState from '../../components/EmptyState';
import MapArea from '../../components/MapArea';


// CONSTANTS & DESTRUCTURING
// ========================================
const TabPane = Tabs.TabPane;
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
const GeneralInfo = ({ shopById }) => {

	return (
		<View>
			<Text style={[textHeader, {textAlign: 'left'}]}>
				{shopById.title || ''}
			</Text>
			<View style={{marginTop: 10}}>
				<Text style={[textSubHeader, {textAlign: 'left'}]}>
					About this shop
				</Text>
				<Text style={[textBody, {textAlign: 'left', fontSize: 13}]}>
					{shopById.description || ''}
				</Text>
			</View>
			<Text style={[textBody, {textAlign: 'center'}]}>
				{shopById.category || ''}
			</Text>
			<Text style={[textBody, {textAlign: 'center'}]}>
				{shopById.phone || ''}
			</Text>
			<Text style={[textBody, {textAlign: 'center'}]}>
				{shopById.email || ''}
			</Text>
			<Text style={[textBody, {textAlign: 'center'}]}>
				{shopById.website || ''}
			</Text>
		</View>
	);
}


   
// EXPORTED COMPONENT
// ========================================
class ShopDetail extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		title: `${navigation.state.params && navigation.state.params.shopTitle || 'Shop Detail'}`,
		tabBarIcon: ({ tintColor }) => <Icon name="group" size={30} color={tintColor} />,
	  	headerTitleStyle: titleStyle,
	  	headerStyle: basicHeaderStyle,
	  	header: null,
	  	tabBarVisible: false,
	  	headerLeft: <BackButton goBack={navigation.goBack} label='' />,
	});
	render(){

		const { data, navigation } = this.props;

		if (data.loading) {
			return <LoadingScreen loadingMessage='Loading Shop...' />
		}

		return (
			<ScrollView style={styles.container} contentContainerStyle={styles.contentContainerStyle}>
				<Image source={{uri: data.shopById.image || DEFAULT_SHOP_IMAGE}} style={{width: SCREEN_WIDTH, height: 250}}>
					<View style={styles.backButtonContainer}>
				          <Icon size={35} color='#fff' name='chevron-left' onPress={()=>this.props.navigation.goBack()} />
					</View>
				</Image>
				<View style={{padding: 10, minHeight: 300}}>
					<GeneralInfo shopById={data.shopById} />
				</View>
				<MapArea 
					region={{
			    		longitude: parseFloat(data.shopById.location.lng) || -122,
		      			latitude: parseFloat(data.shopById.location.lat) || 37,
				      	latitudeDelta: 0.0922,
		      			longitudeDelta: 0.0421,
			    	}}
			    	data={data}
			    	navigation={navigation}
			    />
			</ScrollView>
		);
	}
	
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
	backButtonContainer: {
	    position: 'absolute',
	    top: 25,
	    left: 5
	  }
});


// EXPORT
// ========================================
export default graphql(FETCH_SHOP, {
  options: (props) => { 
  	let variables = { _id: props.navigation.state.params._id };
  	return { variables } 
  }
})(ShopDetail);