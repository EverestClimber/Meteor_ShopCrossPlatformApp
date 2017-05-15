import React from 'react';
import { ImagePicker } from 'expo';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Image, ActivityIndicator } from 'react-native';
//REDUX
import _ from 'lodash';
//COMPONENTS
import LoadingScreen from './LoadingScreen'
import { Button, Icon } from 'react-native-elements'
//MODULES
import { colorConfig } from '../modules/config';
import { graphql, withApollo } from 'react-apollo';
import { CREATE_SHOP } from '../apollo/mutations'
import { List, Radio, InputItem, SegmentedControl, TextareaItem, WhiteSpace } from 'antd-mobile';
import client from '../ApolloClient';
import { handleFileUpload } from '../modules/helpers';

const RadioItem = Radio.RadioItem;

const PRIORITY_LEVEL = [
  { key: 1, value: '1', intValue: 1, label: 'General'},
  { key: 2, value: '2', intValue: 2, label: 'Suspicious but not Urgent'},
  { key: 3, value: '3', intValue: 3, label: 'Urgent'}
];

const CATEGORY_OPTIONS = [
  { label: 'food', value: 'food'},
  { label: 'clothing', value: 'clothing'},
  { label: 'electronics', value: 'electronics'}
];



const ImageArea = ({ image, onImageClick, onImageCameraClick, onRemoveImage, imageLoading }) => {

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
            {!image && <Button title='Upload' icon={{ name: 'file-upload' }} onPress={() => onImageClick()} />}
          </View>
          <View style={{flex: 1}}>
            {!image && <Button title='Camera' icon={{ name: 'camera-alt' }} onPress={() => onImageCameraClick()} />}
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




class AddShopForm extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      loading: false,
      imageLoading: false,
      watchgroupIds: [],
      messageValue: null,
      image: null, 
      value: 0,
      priorityLevel: null,
      reportType: null,
      erorrs: []
  }
    this.onImageClick = this.onImageClick.bind(this);
    this.onImageCameraClick = this.onImageCameraClick.bind(this);
    
  }
  
  onSubmit = () => {
    const { title, description, category, image } = this.state;
    this.setState({loading: true})

    let variables = {
      title: title,
      description: description,
      category: category,
      image: image,
      longitude: this.props.location.coords.longitude,
      latitude: this.props.location.coords.latitude,
    }
    this.props.mutate({ variables })
      .then(() => {
        client.resetStore()
        this.props.navigation.goBack()
        return this.setState({ loading: false });
    }).catch(err => {
      let errors = err && err.graphQLErrors && err.graphQLErrors.length > 0 && err.graphQLErrors.map( err => err.message );
      return this.setState({loading: false, errors: errors});
    });

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
        _this.setState({ image: response, imageLoading: false }); 
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
        _this.setState({ image: response, imageLoading: false }); 
      });
    }
    
    _this.setState({ imageLoading: false }); 
  }
  render(){


    if (this.state.loading) {
       return <LoadingScreen loadingMessage={'Adding shop...'} />;
    }
    
    /*if (this.props.data.loading) {
       return <LoadingScreen loadingMessage={'Loading Form...'} />;
    }*/


    return (
      <View style={{width: 300}}>
        <ImageArea 
          image={this.state.image}  
          imageLoading={this.state.imageLoading}  
          onImageClick={this.onImageClick} 
          onImageCameraClick={this.onImageCameraClick}
          onRemoveImage={()=>this.setState({image: null})}
        />
        <List renderHeader={() => 'Title'}>
          <InputItem
              clear
              placeholder="Type your message here..."
              onChange={(val)=>this.setState({title: val})}
          />
        </List>
        <List renderHeader={() => 'Description'}>
          <TextareaItem
              clear
              placeholder="Type your message here..."
              rows={4}
              onChange={(val)=>this.setState({description: val})}
          />
        </List>
        <List renderHeader={() => 'Category'}>
          {CATEGORY_OPTIONS.map(i => (
            <RadioItem 
              key={i.value} 
              checked={this.state.category === i.value} 
              onChange={() => this.setState({category: i.value})}
            >
              {i.label}
            </RadioItem>
          ))}
        </List>
        <View style={{marginTop: 20}}>
          <Button 
            title='ADD SHOP'
            backgroundColor={colorConfig.business} 
            onPress={this.onSubmit}
          />
        </View>
      </View>
    )
  }
}



const styles = StyleSheet.create({
  labelStyle: {
    fontFamily: 'proximanovasoft-regular',
    color: '#666',
    textAlign: 'left',
    fontSize: 15,
  },
  buttonText: {
    fontFamily: 'proximanovasoft-bold',
    color: '#fff', 
    fontSize: 18,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textArea: {
    borderColor: colorConfig.lightGrey,
    backgroundColor: '#fff',
    borderRadius: 3,
    marginBottom: 4,
    borderWidth: 1,
    height: 100,
    width: 250,
    fontSize: 15,
    padding: 3,
    fontFamily: 'proximanovasoft-regular',
  },
  input: {
    borderColor: colorConfig.lightGrey,
    backgroundColor: '#fff',
    borderRadius: 3,
    marginBottom: 4,
    borderWidth: 1,
    padding: 3,
    height: 37,
    width: 250,
    fontSize: 15,
    margin: 'auto',
    fontFamily: 'proximanovasoft-regular',
  }
})


export default graphql(CREATE_SHOP)(AddShopForm);