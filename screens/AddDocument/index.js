import React from 'react';
import { View, Text, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import { stylesConfig } from '../../modules/config';
import BackButton from '../../components/BackButton';
import AddDocumentForm from '../../components/AddDocumentForm';



const { basicHeaderStyle, titleStyle } = stylesConfig;

class AddDocument extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		title: 'Add Document',
		tabBarIcon: ({ tintColor }) => <Icon name="list" size={30} color={tintColor} />,
	  	headerTitleStyle: titleStyle,
	  	headerVisible: Platform.OS !== 'android',
	  	tabBarLabel: 'Documents',
	  	headerStyle: basicHeaderStyle,
	  	tabBarVisible: false,
	  	headerLeft: <BackButton goBack={navigation.goBack} label='' />,
	});
	render(){
		return (
			<View style={{flex: 1, padding: 10, backgroundColor: '#f5f5f5',}}>
				<AddDocumentForm onSubmitForm={this.onSubmitForm} />
			</View>
		);
	}
}



export default AddDocument;

