import React from 'react';
import { View, ScrollView, Text, Platform, Image, FlatList, TouchableOpacity } from 'react-native';
import { Permissions, Location, MapView, DangerZone } from 'expo';
//MODULES
import { FETCH_SHOP } from '../../apollo/queries';
import { stylesConfig, colorConfig, DEFAULT_SHOP_IMAGE } from '../../modules/config';
import LoadingScreen from '../../components/LoadingScreen';
import ShopCard from '../../components/ShopCard';
import { Icon, Button, Card } from 'react-native-elements';
import { graphql } from 'react-apollo';
import BackButton from '../../components/BackButton';
import { Tabs, WhiteSpace,  } from 'antd-mobile';
import EmptyState from '../../components/EmptyState';


//
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


const GeneralInfo = ({ shopById }) => {

	return (
		<View>
			<Text style={[textHeader, {textAlign: 'center'}]}>
				{shopById.title || ''}
			</Text>
			<Text style={[textSubHeader, {textAlign: 'center'}]}>
				{shopById.description || ''}
			</Text>
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

   
// EXPORTED 
// ========================================
class ShopDetail extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		title: `${navigation.state.params && navigation.state.params.shopTitle || 'Shop Detail'}`,
		tabBarIcon: ({ tintColor }) => <Icon name="group" size={30} color={tintColor} />,
	  	headerTitleStyle: titleStyle,
	  	headerStyle: basicHeaderStyle,
	  	//header: null,
	  	tabBarVisible: false,
	  	headerLeft: <BackButton goBack={navigation.goBack} label='' />,
	});
	render(){

		const { data, navigation } = this.props;

		if (data.loading) {
			return <LoadingScreen loadingMessage='Loading Shop...' />
		}

		return (
			<View style={{flex: 1, backgroundColor: colorConfig.screenBackground}}>

				<Card containerStyle={{marginBottom: 25}}>
					<Image source={{uri: data.shopById.image || DEFAULT_SHOP_IMAGE}} style={{width: 200, height: 200}}/>
					<GeneralInfo shopById={data.shopById} />
					<TouchableOpacity onPress={()=>navigation.navigate('detailMap', { _id: data.shopById._id })}>
						<Text>GO TO MAP</Text>
					</TouchableOpacity>
				</Card>

				{/*<Tabs defaultActiveKey="1"
					textColor={colorConfig.darkGrey}
					activeTextColor={colorConfig.business}
					activeUnderlineColor={colorConfig.business} 
					underlineColor={colorConfig.lightGrey}
					barStyle={{backgroundColor: '#fff'}}
				>
			      <TabPane tab="Details" key="1">
			      	<View style={{minHeight: 300}}>
			      	</View>
			      </TabPane>
			      <TabPane tab="Map" key="2">
			      	<View style={{minHeight: 400}}>
				      	<MapView
				          region={this.state.region}
				          style={{ flex: 1 }}
				          loadingEnabled
				          onRegionChangeComplete={this.onRegionChangeComplete}
				        >
				        	<MapView.Marker
		        				title={data.shopById.title}
		        				description={data.shopById.description}
		        				coordinate={{ latitude: parseFloat(data.shopById.location.lat), longitude: parseFloat(data.shopById.location.lng) }}
		        			/>
				        </MapView>
			      	</View>
			      </TabPane>
			    </Tabs>*/}
			</View>
		);
	}
	
}

export default graphql(FETCH_SHOP, {
  options: (props) => { 
  	let variables = { _id: props.navigation.state.params._id };
  	return { variables } 
  }
})(ShopDetail);