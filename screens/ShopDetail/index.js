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
// COMPONENTS
import LoadingScreen from '../../components/LoadingScreen';
import ShopCard from '../../components/ShopCard';
import BackButton from '../../components/BackButton';
import EmptyState from '../../components/EmptyState';
import MapArea from '../../components/MapArea';
import ShopDetailInfoArea from '../../components/ShopDetailInfoArea';
import Carousel from 'react-native-looped-carousel';


// TODO
// add carousel like airbnb to show multiple images
// potential package options:
// https://github.com/appintheair/react-native-looped-carousel
// https://github.com/archriss/react-native-snap-carousel
// https://github.com/machadogj/react-native-carousel-control
// https://github.com/jacklam718/react-native-carousel-component


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





class CarouselExample extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      size: { width: SCREEN_WIDTH, height: 250 },
    };
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Carousel
          delay={3000}
          style={this.state.size}
          autoplay
        >
        	<Image source={{uri: 'https://infotion.com/wp-content/uploads/2016/12/Denpasar-Bali.jpg'}} style={this.state.size} />
        	<Image source={{uri: 'https://static.asiawebdirect.com/m/bangkok/portals/bali-indonesia-com/homepage/magazine/the-seminyak-village/allParagraphs/BucketComponent/ListingContainer/03/BucketList/0/image1/the-seminyak-village-bali.jpg'}} style={this.state.size} />
        	<Image source={{uri: 'https://static.asiawebdirect.com/m/bangkok/portals/bali-indonesia-com/homepage/kuta-beach/mal-bali-galeria/allParagraphs/BucketComponent/ListingContainer/02/image/mal-bali-galeria-tenant.jpg'}} style={this.state.size} />
        </Carousel>
        	<View style={styles.backButtonContainer}>
		          <Icon size={35} color='#fff' name='chevron-left' onPress={()=>this.props.navigation.goBack()} />
			</View>
      </View>
    );
  }
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
				{/*<Image source={{uri: data.shopById.image || DEFAULT_SHOP_IMAGE}} style={{width: SCREEN_WIDTH, height: 250}}>
					<View style={styles.backButtonContainer}>
				          <Icon size={35} color='#fff' name='chevron-left' onPress={()=>this.props.navigation.goBack()} />
					</View>
				</Image>*/}
				<CarouselExample {...this.props} />
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
	dividerStyle: {
		height: 1, 
		backgroundColor: "#e1e8ee",
		marginTop: 20,
		marginBottom: 20
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