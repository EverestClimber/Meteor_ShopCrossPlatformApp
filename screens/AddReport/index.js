import React from 'react';
import { Permissions, Location } from 'expo';
import { View, ScrollView, Text, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import { stylesConfig } from '../../modules/config';
import BackButton from '../../components/BackButton';
import AddReportForm from '../../components/AddReportForm';



const { basicHeaderStyle, titleStyle } = stylesConfig;

class AddReport extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		title: 'Add Report',
		tabBarIcon: ({ tintColor }) => <Icon name="list" size={30} color={tintColor} />,
	  	headerTitleStyle: titleStyle,
	  	headerVisible: Platform.OS !== 'android',
	  	tabBarLabel: 'Documents',
	  	headerStyle: basicHeaderStyle,
	  	tabBarVisible: false,
	  	headerLeft: <BackButton goBack={navigation.goBack} label='' />,
	});

	state = { location: null, errors: [] }

	async componentDidMount() {
	  const { status } = await Permissions.askAsync(Permissions.LOCATION);
	  if (status === 'granted') {
	    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
	    return this.setState({location})
	  } else {
	    throw new Error('Location permission not granted');
	  }
	}
	render(){
		return (
			<ScrollView style={{flex: 1, padding: 10, backgroundColor: '#f5f5f5',}}>
				<AddReportForm 
					onSubmitForm={this.onSubmitForm}
					location={this.state.location}
				/>
			</ScrollView>
		);
	}
}



export default AddReport;