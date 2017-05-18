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



// CONSTANTS & DESTRUCTURING
// ====================================
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



// EXPORTED COMPONENT
// ====================================
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


// REDUX
// ====================================
let mapStateToProps = (state) => {
	return { onboardingComplete: state.auth.onboardingComplete }
}


// EXPORT
// ====================================
export default connect(mapStateToProps, actions)(WelcomeScreen);