import React from 'react';
import { Text, View, AsyncStorage, Platform, Image, StyleSheet } from 'react-native';
import SignupForm from '../../components/SignupForm'
import LoadingScreen from '../../components/LoadingScreen'
import { withApollo } from 'react-apollo';
import { userId } from 'meteor-apollo-accounts'
import { Button, Icon } from 'react-native-elements'
import { colorConfig, stylesConfig } from '../../modules/config';
import { BlurView } from 'expo';

const { basicHeaderStyle, titleStyle } = stylesConfig;




class SignupScreen extends React.Component {
	 static navigationOptions = {
	    title: 'Signup',
	    tabBarIcon: ({ tintColor }) => <Icon name="person-add" size={30} color={tintColor} />,
	      headerTitleStyle: titleStyle, 
	      tabBarLabel: 'Signup',
	      headerVisible: true, //Platform.OS !== 'android',
	      headerStyle: basicHeaderStyle
	  };

	state = { stillLoading: true }

	render(){
		/*if (this.state.stillLoading) {
			return <LoadingScreen loadingMessage={''} />;
		}*/
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

export default SignupScreen;