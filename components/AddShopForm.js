import React from 'react';
import { ImagePicker, Permissions } from 'expo';
import { List, Radio, InputItem, SegmentedControl, TextareaItem, WhiteSpace } from 'antd-mobile';
import { View, Text, TextInput, ScrollView, Alert, TouchableOpacity, StyleSheet, Platform, Image, ActivityIndicator } from 'react-native';
//REDUX
import _ from 'lodash';
//COMPONENTS
import LoadingScreen from './LoadingScreen'
import { Button, Icon } from 'react-native-elements'
//MODULES
import { colorConfig,  } from '../modules/config';
import { handleFileUpload, CATEGORY_OPTIONS,  } from '../modules/helpers';
// APOLLO
import { graphql, withApollo } from 'react-apollo';
import { FETCH_EXISTING_SHOPS, SEARCH_SHOPS_BY_OWNER } from '../apollo/queries'
import { CREATE_SHOP } from '../apollo/mutations'
import client from '../ApolloClient';
// REDUX
import { connect } from 'react-redux'
import * as actions from '../actions';

const RadioItem = Radio.RadioItem;




const ImageArea = ({ image, onImageClick, onImageCameraClick, onRemoveImage, imageLoading }) => {

  if (imageLoading) {
    return (
      <View style={{marginBottom: 15, marginTop: 15}}>
        <ActivityIndicator />
      </View>
    );
  }
  
  console.log(image)

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
      errors: []
  }
    this.onImageClick = this.onImageClick.bind(this);
    this.onImageCameraClick = this.onImageCameraClick.bind(this);
    
  }
  
  onSubmit = () => {
    const { title, description, category, image, phone, email, website } = this.state;
    const { mutate, navigation, location, data } = this.props;
    let errors = [];
    this.setState({loading: true})

    let variables = {
      title, description, category, image, phone, email, website, longitude: location.coords.longitude, latitude: location.coords.latitude,
    };

    if (!title) {
      errors.push('title is required')
      return this.setState({loading: false, errors: errors});
    }
    if (!description) {
      errors.push('description is required')
      return this.setState({loading: false, errors: errors});
    }
    if (!category) {
      errors.push('category is required')
      return this.setState({loading: false, errors: errors});
    }
    //, refetchQueries: [ 'shops', 'shopsByOwner']
    mutate({ variables}).then(() => {
        console.log(client)
        client.resetStore();
        navigation.goBack();
        return this.setState({ loading: false });
    }).catch(err => {
      console.log(err)
      //let newErrors = errors.concat(err && err.graphQLErrors && err.graphQLErrors.length > 0 && err.graphQLErrors.map( err => err.message ));
      return this.setState({loading: false, errors});
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
  renderPossibleDuplicates(){

    const { shopExists, loading } = this.props.data;

    if (loading) {
       return <ActivityIndicator />;
    }

    return (
      <List renderHeader={() => 'Possible duplicate?'}>
        {shopExists.map( item => {
          return (
            <Text key={item._id} style={{fontSize: 15, color: 'red'}}>
              {item.title}
            </Text>
          )
        })}
      </List>
    );
    
  }
  render(){


    if (this.state.loading) {
       return <LoadingScreen loadingMessage={'Adding shop...'} />;
    }
    
    /*if (this.props.data.loading) {
       return <LoadingScreen loadingMessage={'Loading Form...'} />;
    }*/
    if (!this.props.data.loading && this.props.data.shopExists) {
      console.log(this.props.data.shopExists)
    }

    
    return (
      <View style={{width: 300}} behavior="padding">
        <ImageArea 
          image={this.state.image}  
          imageLoading={this.state.imageLoading}  
          onImageClick={this.onImageClick} 
          onImageCameraClick={this.onImageCameraClick}
          onRemoveImage={()=>this.setState({image: null})}
        />
        <View style={{marginTop: 8, marginBottom: 8, alignItems: 'center',  justifyContent: 'center',}}>
          {this.state.errors.length > 0 && this.state.errors.map(item => {
            return <Text key={item} style={{color: '#e74c3c'}}>{item}</Text>
          })}
        </View>
        <List renderHeader={() => 'Title'}>
          <InputItem
              clear
              placeholder="Type your message here..."
              onChange={(val)=>{
                this.props.onTitleChange(val)
                this.setState({ title: val })
              }}
          />
        </List>
        {!this.props.data.loading && this.props.data.shopExists.length > 0 && this.renderPossibleDuplicates()}
        <List renderHeader={() => 'Description'}>
          <TextareaItem
              clear
              placeholder="Type your message here..."
              rows={4}
              onChange={(val)=>this.setState({description: val})}
          />
        </List>
        <List renderHeader={() => 'Category'}>
          <ScrollView style={{height: 200}}>
            {CATEGORY_OPTIONS.map(i => (
              <RadioItem 
                key={i.value} 
                checked={this.state.category === i.value} 
                onChange={() => this.setState({category: i.value})}
              >
                {i.label}
              </RadioItem>
            ))}
          </ScrollView>
        </List>
        <List renderHeader={() => 'Phone'}>
          <InputItem
              clear
              placeholder="Shop phone number..."
              onChange={(val)=>this.setState({phone: val})}
          />
        </List>
        <List renderHeader={() => 'Website'}>
          <InputItem
              clear
              placeholder="website..."
              onChange={(val)=>this.setState({website: val})}
          />
        </List>
        <List renderHeader={() => 'Email'}>
          <InputItem
              clear
              placeholder="Shop email..."
              onChange={(val)=>this.setState({email: val})}
          />
        </List>
        <View style={{marginTop: 8, marginBottom: 8, alignItems: 'center',  justifyContent: 'center',}}>
          {this.state.errors.length > 0 && this.state.errors.map(item => {
            return <Text key={item} style={{color: '#e74c3c'}}>{item}</Text>
          })}
        </View>
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

let options = { 
  refetchQueries: [ 
    { query: FETCH_EXISTING_SHOPS },
    { query: SEARCH_SHOPS_BY_OWNER },  
  ]
}


const ComponentWithData = graphql(FETCH_EXISTING_SHOPS, {
  options: (props) => {
    let variables = { 
      string: props.title && props.title.length > 4 ? props.title : null, //if user has not typed in at least 4 characters yet, then do not search for duplicates
    };
    return { variables } 
  }
})( graphql(CREATE_SHOP)(AddShopForm) );

let mapStateTopProps = ({ addShopForm }) => {
  return {
    title: addShopForm.title
  }
}

// EXPORT
// ====================================
export default connect( mapStateTopProps, actions )(ComponentWithData);


//export default graphql(CREATE_SHOP, options)(AddShopForm);

