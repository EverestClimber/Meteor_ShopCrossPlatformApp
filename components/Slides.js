import React from 'react';
import { View, Button, Text, ScrollView, Dimensions, Image } from 'react-native';



// CONSTANTS & DESTRUCTURING
// ====================================
const SCREEN_WIDTH = Dimensions.get('window').width;



// EXPORTED COMPONENT
// ====================================
class Slides extends React.Component {
	renderLastSlide(index){

		if (index === this.props.data.length - 1) {
			return (
				<Button 
					title="LET'S GO!"
					raised
					buttonStyle={styles.buttonStyle}
					textStyle={{color: '#666'}}
					onPress={this.props.onSlidesComplete}
				/>
			);
		}

	}
	renderSlides(){
		return this.props.data.map((slide, index) => {
			return (
				<View key={slide.text} style={[styles.slideStyle, { backgroundColor: slide.color }]}>
					{slide && slide.img}
					<Text style={styles.textStyle}>{slide.text}</Text>
					{this.renderLastSlide(index)}
				</View>
			);
		})
	}
	render(){

		return (
			<ScrollView horizontal style={{flex: 1}} pagingEnabled>
				{this.renderSlides()}
			</ScrollView>
		);
	}
}


// STYLES
// ====================================
const styles = {
	slideStyle: {
		flex: 1,
		width: SCREEN_WIDTH,
		justifyContent: 'center',
		alignItems: 'center',
		paddingRight: 20,
		paddingLeft: 20,
	},
	buttonStyle: {
		marginTop: 25,
		backgroundColor: '#fff',
	},
	textStyle: {
		textAlign: 'center',
		fontSize: 21,
		color: '#fff',
		fontFamily: 'proximanovasoft-regular',
	}
}


// EXPORT
// ====================================
export default Slides;