//TOP LEVEL IMPORTS
import React from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Header } from 'react-navigation';
import { Permissions, Location, MapView } from 'expo';
// MODULES
import { stylesConfig, colorConfig, SCREEN_WIDTH } from '../modules/config';
// APOLLO
import { FETCH_SHOP } from '../apollo/queries';
import { graphql } from 'react-apollo';
// COMPONENTS
import LoadingScreen from './LoadingScreen';
import ShopCard from './ShopCard';
// CONSTANTS & DESTRUCTURING
// ========================================
const { boldFont, semiboldFont, regularFont, titleStyle, basicHeaderStyle } = stylesConfig;


// EXPORTED COMPONENT
// ========================================
class MapArea extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		const { data, navigation, region } = this.props;
			return (
				<View style={styles.container}>
					<MapView
			          region={region}
			          style={{ height: 350 }}
			          loadingEnabled
			          showsUserLocation
			          onRegionChangeComplete={this.onRegionChangeComplete}
			        >
				        <MapView.Marker
	        				key={data.shopById._id}
	        				title={data.shopById.title}
	        				description={data.shopById.description}
	        				coordinate={{ latitude: parseFloat(data.shopById.location.lat), longitude: parseFloat(data.shopById.location.lng) }}
	        			>
		        			<MapView.Callout tooltip>
				        		<ShopCard item={data.shopById} navigation={navigation} />
				        	</MapView.Callout>
			        	</MapView.Marker>
			        </MapView>
				</View>
			);
	}
}


// STYLES
// ========================================
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colorConfig.screenBackground,
	}
});

// EXPORT
// ========================================
export default MapArea