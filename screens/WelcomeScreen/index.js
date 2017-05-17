//TOP-LEVEL IMPORTS
import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
//COMPONENTS
import Slides from '../../components/Slides'
//MODULES
import { colorConfig, stylesConfig } from '../../modules/config';
//REDUX
import { connect } from 'react-redux';
import * as actions from '../../actions';




const SLIDE_DATA = [
	{
		text: 'Welcome to the App!',
		color: colorConfig.business
	},
	{
		text: 'This is what our app does.',
		color: colorConfig.ecosystem,
	},
	{
		text: 'This is a quick sentence about getting started.',
		color: '#34495e',
	},
	{
		text: 'Ready to move on?',
		color: '#8e44ad',
	},
];




class WelcomeScreen extends React.Component {

	state = { onboardingComplete: null }

	onSlidesComplete = () => {
		this.props.markOnboardingComplete();
		this.props.navigation.navigate('main');
	}
	render(){
		return (
			<Slides data={SLIDE_DATA} onSlidesComplete={this.onSlidesComplete} />
		);
	}
}

let mapStateToProps = (state) => {
	return { onboardingComplete: state.auth.onboardingComplete }
}

export default connect(mapStateToProps, actions)(WelcomeScreen);