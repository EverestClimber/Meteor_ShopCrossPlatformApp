import React from 'react';
import { ImagePicker, Permissions } from 'expo';
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
//COMPONENTS
import { Button, Icon } from 'react-native-elements'
//MODULES
import { colorConfig,  } from '../modules/config';
import { handleFileUpload,  } from '../modules/helpers';



class AttachmentsArea extends React.Component {
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
  onSuccessfulUpload(response){
    this.props.onAttachmentChange(response)
    this.setState({ imageLoading: false }); 
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
      handleFileUpload(result, (err, res) => {
        if (err) { return console.log(err); }
        this.onSuccessfulUpload(res)
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
      handleFileUpload(result, (err, res) => {
        if (err) { return console.log(err); }
        this.onSuccessfulUpload(res)
      });
    }
    
    _this.setState({ imageLoading: false }); 
  }
   render(){

      const { attachments, onRemoveAttachment } = this.props;
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
              {attachments && attachments.length < 5 && (
                <Button title='Upload' icon={{ name: 'file-upload' }} onPress={this.onImageClick} />
              )}
            </View>
            <View style={{flex: 1}}>
              {attachments && attachments.length < 5 && (
                <Button title='Camera' icon={{ name: 'camera-alt' }} onPress={this.onImageCameraClick} />
              )}
            </View>
          </View>
          <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 15, marginTop: 15}}>
            {attachments && attachments.length > 0 && attachments.map( item => (
              <View style={{flex: 1}} key={item._id}>
                <Image source={{ uri: item.url }} style={{ width: 150, height: 150 }} />
                <Icon
                  name='cancel'
                  color='#888'
                  onPress={ () => onRemoveAttachment(item._id) }
                />
              </View>
            ))}
          </View>
      </View>
    );

   }
}

export default AttachmentsArea;