// TOP LEVEL IMPORTS
import React from 'react';
import { View, Text, Platform, StyleSheet, Animated, Image, ScrollView } from 'react-native';
import { Button, Icon, SearchBar, Card } from 'react-native-elements';
import { Header } from 'react-navigation';
import { Permissions, Location, MapView, DangerZone } from 'expo';
// MODULES
import { stylesConfig, colorConfig, SCREEN_WIDTH } from '../../modules/config';
// COMPONENTS
import LoadingScreen from '../../components/LoadingScreen';
import ShopCard from '../../components/ShopCard';
// APOLLO
import client from '../../ApolloClient';
import { FETCH_SHOPS, SEARCH_SHOPS } from '../../apollo/queries';

// CONSTANTS & DESTRUCTURING
// ========================================
const { boldFont, semiboldFont, regularFont, titleStyle, basicHeaderStyle } = stylesConfig;


class FiltersScreen extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		mode: 'modal',
	  	header: null, //(headerProps) => Platform.OS === 'android' ? null : <Header {...headerProps} />, 
	  	tabBarVisible: false
	});
	constructor(props){
		super(props);
	}
	render(){

			return (
				<View style={styles.container}>
			        <View style={styles.backButtonContainer}>
			        	<Icon size={33} color='#666' name='keyboard-backspace' onPress={()=>this.props.navigation.goBack()} />
					</View>
			        <Text>FILTER OPTIONS WILL GO HERE</Text>
			    </View>
			);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colorConfig.screenBackground,
		justifyContent: 'center',
		alignItems: 'center'
	},
	backButtonContainer: {
	    position: 'absolute',
	    top: 22,
	    left: 10
	}
});


export default FiltersScreen;