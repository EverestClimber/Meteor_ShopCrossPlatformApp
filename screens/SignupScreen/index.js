// TOP LEVEL IMPORTS
import React from 'react';
import { BlurView } from 'expo';
import { Text, View, Platform, Image, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements'
// COMPONENTS
import SignupForm from '../../components/SignupForm'
// APOLLO
import { withApollo } from 'react-apollo';
import { userId } from 'meteor-apollo-accounts'
// MODULES
import { colorConfig, stylesConfig } from '../../modules/config';


// CONSTANTS & DESTRUCTURING
// =============================================
const { basicHeaderStyle, titleStyle } = stylesConfig;



// EXPORTED COMPONENT
// =============================================
class SignupScreen extends React.Component {
	 static navigationOptions = {
	    title: 'Signup',
	    tabBarIcon: ({ tintColor }) => <Icon name="person-add" size={30} color={tintColor} />,
	      headerTitleStyle: titleStyle, 
	      tabBarLabel: 'Signup',
	      headerVisible: true,
	      headerStyle: basicHeaderStyle
	  };

	state = { stillLoading: true }

	render(){
		return (
			<View style={{ flex: 1}}>
				<Image style={{ width: null, height: null, flex: 1, }} source={require('../../assets/background.jpg')} />
				<BlurView tint="default" intensity={95} style={StyleSheet.absoluteFill}>
		          	<SignupForm {...this.props} />
		        </BlurView>
	        </View>
		);

	}
}

// EXPORT
// =============================================
export default SignupScreen;

