import React from 'react';
import { ImagePicker, Permissions } from 'expo';
import { List, Radio, InputItem, SegmentedControl, TextareaItem, Checkbox } from 'antd-mobile';
import { View, Text, TextInput, ScrollView, Alert, TouchableOpacity, StyleSheet, Platform, Image, ActivityIndicator } from 'react-native';
//REDUX
import _ from 'lodash';
//COMPONENTS
import LoadingScreen from './LoadingScreen';
import ImageArea from './ImageArea';

import { Button, Icon } from 'react-native-elements'
//MODULES
import { colorConfig,  } from '../modules/config';
import { handleFileUpload, CATEGORY_OPTIONS,  } from '../modules/helpers';
// APOLLO
import { graphql } from 'react-apollo';
import { FETCH_EXISTING_SHOPS, SEARCH_SHOPS_BY_OWNER, FETCH_MALLS } from '../apollo/queries'
import { CREATE_SHOP, SAVE_SHOP } from '../apollo/mutations'
import client from '../ApolloClient';
// REDUX
import { connect } from 'react-redux'
import * as actions from '../actions';

const RadioItem = Radio.RadioItem;
const CheckboxItem = Checkbox.CheckboxItem;







class EditShopForm extends React.Component {
  constructor(props){
    super(props)
    const { title, description, image, categories, mallId } = this.props.shop;
    this.state = {
      title: title || null,
      description: description || null,
      loading: false,
      imageLoading: false,
      image: image || null,
      categories: categories || [],
      value: 0,
      errors: [],
      mallId: mallId || null,
  }
    this.onImageClick = this.onImageClick.bind(this);
    this.onImageCameraClick = this.onImageCameraClick.bind(this);
    
  }
  
  onSubmit = () => {
    const { title, description, categories, image, phone, email, mallId, website } = this.state;
    const { mutate, navigation, location, data, shop } = this.props;
    let errors = [];
    this.setState({loading: true})

    let variables = {
      _id: shop._id, title, description, categories, image, phone, email, mallId, website
    };

    if (!title || !description || !categories) {
      if (!title) { errors.push('title is required') }
      if (!description) { errors.push('description is required') }
      if (!categories) { errors.push('categories is required') }
      return this.setState({loading: false, errors: errors});
    }

    //, refetchQueries: [ 'shops', 'shopsByOwner']
    mutate({ variables }).then(() => {
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
  onCheckboxToggle = (value) => {

    let newCategories;

    if (this.state.categories.includes(value)) {
      newCategories = this.state.categories.filter(element => element !== value)
    }  else {
      newCategories = this.state.categories.concat(value)
    }

    this.setState({ categories: newCategories })

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
  renderButton(){
    if (this.state.loading) {
       return <ActivityIndicator />; // show spinner if form is currently submitting
    }
    return (
      <Button 
        title='SAVE SHOP'
        backgroundColor={colorConfig.business} 
        onPress={this.onSubmit}
      />
    );
  }
  renderMalls = () => {
    const { loading, malls } = this.props.malls;
    
    if (!loading && malls && malls.length > 0) {

      return malls.map( item => {
        return (
          <RadioItem 
            key={item._id} 
            checked={this.state.mallId === item._id} 
            onChange={() => this.setState({mallId: item._id})}
          >
            {item.title}
          </RadioItem>
        );
      })
    }

  }
  render(){

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
              defaultValue={this.state.title}
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
              defaultValue={this.state.description}
              placeholder="Type your message here..."
              rows={4}
              onChange={(val)=>this.setState({description: val})}
          />
        </List>
        <List renderHeader={() => 'Category'}>
          <ScrollView style={{height: 200}}>
            {CATEGORY_OPTIONS.map(i => (
              <CheckboxItem 
                key={i.value} 
                checked={this.state.categories.includes(i.value)} 
                onChange={() => this.onCheckboxToggle(i.value)}
              >
                {i.label}
              </CheckboxItem>
            ))}
          </ScrollView>
        </List>
        <List renderHeader={() => 'Mall'}>
          <ScrollView style={{height: 200}}>
            {this.renderMalls()}
          </ScrollView>
        </List>
        <List renderHeader={() => 'Contact Details'}>
          <InputItem
              clear
              placeholder="Shop phone number..."
              type='phone'
              onChange={(val)=>this.setState({phone: val})}
          />
          <InputItem
              clear
              placeholder="Shop website..."
              onChange={(val)=>this.setState({website: val})}
          />
          <InputItem
              clear
              placeholder="Shop email..."
              onChange={(val)=>this.setState({email: val})}
          />
        </List>
        <List renderHeader={() => 'Social Meda'}>
          <InputItem
              clear
              placeholder="Facebook..."
              onChange={(val)=>this.setState({facebook: val})}
          />
          <InputItem
              clear
              placeholder="Instagram..."
              onChange={(val)=>this.setState({instagram: val})}
          />
          <InputItem
              clear
              placeholder="Twitter..."
              onChange={(val)=>this.setState({twitter: val})}
          />
        </List>
        <View style={{marginTop: 8, marginBottom: 8, alignItems: 'center',  justifyContent: 'center',}}>
          {this.state.errors.length > 0 && this.state.errors.map(item => {
            return <Text key={item} style={{color: '#e74c3c'}}>{item}</Text>
          })}
        </View>


          <View style={{height: 45, marginTop: 20}}>
          {this.renderButton()}
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
})(graphql(SAVE_SHOP)(
    graphql(FETCH_MALLS, { name: 'malls' })(EditShopForm)
  )
);

let mapStateTopProps = ({ addShopForm }) => {
  return {
    title: addShopForm.title
  }
}

// EXPORT
// ====================================
export default connect( mapStateTopProps, actions )(ComponentWithData);


//export default graphql(CREATE_SHOP, options)(AddShopForm);

