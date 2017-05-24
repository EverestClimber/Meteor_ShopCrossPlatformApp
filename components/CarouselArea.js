// TOP LEVEL IMPORTS
import React from 'react';
import { View, ScrollView, Text, Platform, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon, Button } from 'react-native-elements';
//MODULES
import { stylesConfig, colorConfig, DEFAULT_SHOP_IMAGE, SCREEN_WIDTH } from '../modules/config';
// COMPONENTS
import Carousel from 'react-native-looped-carousel';


// CONSTANTS & DESTRUCTURING
// ========================================
const { 
	basicHeaderStyle, 
	titleStyle, 
	regularFont, 
	textHeader, 
	textSubHeader, 
	textBody 
} = stylesConfig;



class CarouselArea extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      size: { width: SCREEN_WIDTH, height: 250 },
    };
  }
  render() {

  	const { data, navigation } = this.props;
  	let imageUrls = [];

  	if (data.shopById && data.shopById.image) {
  		imageUrls.push(data.shopById.image);
  	}
  	
  	if (data.shopById && data.shopById.attachments &&  data.shopById.attachments.length > 0) {
  		let urls = data.shopById.attachments.map(item => item.url)
  		imageUrls = [data.shopById.image, ...urls ]
  	}

    return (
      <View style={{ flex: 1 }}>
      		<View style={styles.backButtonContainer}>
		          <Icon 
		          	underlayColor='transparent'
		          	size={35} 
		          	color='#fff' 
		          	name='chevron-left' 
		          	onPress={()=>this.props.navigation.goBack()} 
		          />
			</View>
        <Carousel
          delay={3000}
          style={this.state.size}
          autoplay
        >
        	{imageUrls.map( url => {
        		return <Image key={url} source={{uri: url || DEFAULT_SHOP_IMAGE }} style={this.state.size} />
        	})}
        </Carousel>
        	
      </View>
    );
  }
}


// STYLES
// ========================================
const styles = StyleSheet.create({
  backButtonContainer: {
      position: 'absolute',
      top: 25,
      left: 5,
      zIndex: 1
    }
});

export default CarouselArea
   