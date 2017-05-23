import React from 'react';
import { ImagePicker, Permissions } from 'expo';
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
//COMPONENTS
import { Button, Icon } from 'react-native-elements'
//MODULES
import { colorConfig,  } from '../modules/config';
import { handleFileUpload,  } from '../modules/helpers';



class ImageArea extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      loading: false,
      imageLoading: false,
      errors: [],
  }
    this.onImageClick = this.onImageClick.bind(this);
    this.onImageCameraClick = this.onImageCameraClick.bind(this);
    
  }
   async onImageClick(){
    let result;
    let _this = this;
    _this.setState({ imageLoading: true });

    try {
      result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [4, 3] }); 
    }

    catch(e) {
      _this.setState({ imageLoading: false }); 
      return console.log(e);
    }

    if (!result.cancelled) {
      handleFileUpload(result, (error, response) => {
        if (error) { return console.log(error); }
        this.props.onImageChange(response)
        _this.setState({ imageLoading: false }); 
      });
    }
    
    _this.setState({ imageLoading: false }); 

  }
  async onImageCameraClick(){
    let result;
    let _this = this;
    _this.setState({ imageLoading: true });

    try {
      result = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [4, 3] }); 
    }

    catch(e) {
      _this.setState({ imageLoading: false }); 
      return console.log(e);
    }

    if (!result.cancelled) {
      handleFileUpload(result, (error, response) => {
        if (error) { return console.log(error); }
        this.props.onImageChange(response)
        _this.setState({ imageLoading: false }); 
      });
    }
    
    _this.setState({ imageLoading: false }); 
  }
   render(){

      const { image, onRemoveImage } = this.props;
      const { imageLoading } = this.state;

      if (imageLoading) {
        return (
          <View style={{marginBottom: 15, marginTop: 15}}>
            <ActivityIndicator />
          </View>
        );
      }

      return (
      <View style={{marginBottom: 15, marginTop: 15}}>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              {!image && <Button title='Upload' icon={{ name: 'file-upload' }} onPress={this.onImageClick} />}
            </View>
            <View style={{flex: 1}}>
              {!image && <Button title='Camera' icon={{ name: 'camera-alt' }} onPress={this.onImageCameraClick} />}
            </View>
          </View>
          <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            {image && (
              <View style={{flex: 1}}>
                <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />
                <Icon
                  name='cancel'
                  color='#888'
                  onPress={() => onRemoveImage()}
                />
              </View>
            )}
          </View>
      </View>
    );

   }
}

export default ImageArea;