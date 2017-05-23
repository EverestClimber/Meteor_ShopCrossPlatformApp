// TOP LEVEL IMPORTS
import React from 'react';
import { View, ScrollView, Text, Platform, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon, Button, Card, Badge, Divider } from 'react-native-elements';
//MODULES
import { stylesConfig, colorConfig, DEFAULT_SHOP_IMAGE, SCREEN_WIDTH } from '../../modules/config';
import { getCategoryTag } from '../../modules/helpers';
// APOLLO
import { graphql } from 'react-apollo';
import { FETCH_SHOP } from '../../apollo/queries';
import { DELETE_SHOP } from '../../apollo/mutations';
// COMPONENTS
import LoadingScreen from '../../components/LoadingScreen';
import ShopCard from '../../components/ShopCard';
import BackButton from '../../components/BackButton';
import EmptyState from '../../components/EmptyState';
import MapArea from '../../components/MapArea';
import ShopDetailInfoArea from '../../components/ShopDetailInfoArea';
import CarouselArea from '../../components/CarouselArea';



// CONSTANTS & DESTRUCTURING
// ========================================
const { 
	basicHeaderStyle, 
	titleStyle, 
	regularFont, 
	textHeader, 
	textSubHeader, 
	textBody 
} = stylesConfig;


   
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
	onDeleteShop = () => {
		const { data, navigation, mutate } = this.props;
		let variables = { shopId: data.shopById._id }
		mutate({ variables }).then(res => navigation.goBack())
	}
	renderDeleteIfOwner(){
		const { data, navigation, screenProps } = this.props;
		// if the user is the owner of this document, show them the options to the delete the record
		if (!data.loading && data.shopById.owner._id === screenProps.data.user._id) {
			return (
				<View style={{padding: 10}}>
					<Button 
						onPress={this.onDeleteShop}
						backgroundColor={'red'} 
						icon={{name: 'delete', color: '#fff'}}
						iconRight
						title='DELETE SHOP'
					/>
				</View>
			);
		}
		return null
	}
	renderEditIfOwner(){
		const { data, navigation, screenProps } = this.props;
		// if the user is the owner of this document, show them the options to the delete the record
		if (!data.loading && data.shopById.owner._id === screenProps.data.user._id) {
			return (
				<View style={{padding: 10}}>
					<Button 
						onPress={()=> navigation.navigate('editShop', { _id: data.shopById._id })}
						backgroundColor={'grey'} 
						icon={{name: 'border-color', color: '#fff'}}
						iconRight
						title='EDIT SHOP'
					/>
				</View>
			);
		}
		return null
	}
	render(){

		const { data, navigation } = this.props;

		if (data.loading) {
			return <LoadingScreen loadingMessage='Loading Shop...' />
		}

		return (
			<ScrollView style={styles.container} contentContainerStyle={styles.contentContainerStyle}>
				<CarouselArea {...this.props} />
				<ShopDetailInfoArea 
					shopById={data.shopById} 
				/>
				<View style={{padding: 10}}>
					<Text style={[textSubHeader, {textAlign: 'left', fontSize: 18, marginBottom: 15}]}>
						Location info
					</Text>
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
			    	{...this.props}
			    />
			    {this.renderDeleteIfOwner()}
			    {this.renderEditIfOwner()}
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
	dividerStyle: {
		height: 1, 
		backgroundColor: "#e1e8ee",
		marginTop: 20,
		marginBottom: 20
	},
	backButtonContainer: {
	    position: 'absolute',
	    top: 25,
	    left: 5,
	    zIndex: 1
	  }
});


// EXPORT
// ========================================
export default graphql(FETCH_SHOP, {
  options: (props) => { 
  	return { 
  		variables: { 
  			_id: props.navigation.state.params._id 
  		}
  	} 
  }
})(
	graphql(DELETE_SHOP)(ShopDetail)
);


