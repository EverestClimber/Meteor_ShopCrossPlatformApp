import React from 'react';
import { View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ImagePicker } from 'expo';
import { Card, Button, Icon } from 'react-native-elements';
import { handleFileUpload } from '../modules/helpers';

// More info on all the options is below in the README...just some common use cases shown here
const options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

class ProfileAvatar extends React.Component {
  constructor(props){
    super(props);
    this.onImageClick = this.onImageClick.bind(this);
    this.state = { loading: null };

  }
  async onImageClick(){
    let result;
    let _this = this;
    _this.setState({ loading: true }); 
    try {

      result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      
    }
    catch(e) {
      _this.setState({ loading: false }); 
      return console.log(e);
    }

    if (!result.cancelled) {
      handleFileUpload(result, function(error, response){
        if (error) { console.log(error); return; }
        return _this.setState({ image: response, loading: false }); 
      });
    }
    _this.setState({ loading: false }); 

  }
  renderProfileImage = () => {

    const { loading, user } = this.props.screenProps.data;

    if (this.state.image || user.profile.image) {
      return (
        <Image 
          source={{ uri: this.state.image || user.profile.image }} 
          style={{ width: 200, height: 200 }} 
        />
      );
    }

  }
  render(){

    const { loading, user } = this.props.screenProps.data;

    if (this.state.loading || loading) {
      return <ActivityIndicator />
    }

    return (
      <View>
        <TouchableOpacity onPress={this.onImageClick}>
          <View style={{borderColor: '#d6d7da', borderRadius: 4, borderWidth: 0.5}}>
            {!this.state.image && !user.profile.image && <Text style={{textAlign: 'center'}}>Upload</Text>}
            {this.renderProfileImage()}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ProfileAvatar;

