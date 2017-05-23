import React from 'react';
import { ImagePicker, Permissions } from 'expo';
import uuidV4 from 'uuid/v4'
import { List, Radio, InputItem, SegmentedControl, TextareaItem, Checkbox } from 'antd-mobile';
import { View, Text, TextInput, ScrollView, Alert, TouchableOpacity, StyleSheet, Platform, Image, ActivityIndicator } from 'react-native';
//REDUX
import _ from 'lodash';
//COMPONENTS
import LoadingScreen from './LoadingScreen';
import ImageArea from './ImageArea';
import PossibleDuplicates from './PossibleDuplicates';
import AttachmentsArea from './AttachmentsArea';
import { Button, Icon } from 'react-native-elements'
//MODULES
import { colorConfig,  } from '../modules/config';
import { handleFileUpload, CATEGORY_OPTIONS,  } from '../modules/helpers';
// APOLLO
import { graphql } from 'react-apollo';
import { FETCH_EXISTING_SHOPS, SEARCH_SHOPS_BY_OWNER, FETCH_MALLS } from '../apollo/queries'
import { SAVE_SHOP, ADD_ATTACHMENTS, REMOVE_ATTACHMENT } from '../apollo/mutations'
import client from '../ApolloClient';
// REDUX
import { connect } from 'react-redux'
import * as actions from '../actions';

const RadioItem = Radio.RadioItem;
const CheckboxItem = Checkbox.CheckboxItem;







class EditShopForm extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      title: this.props.shop.title || null,
      description: this.props.shop.description || null,
      loading: false,
      image: this.props.shop.image || null,
      categories: this.props.shop.categories || [],
      value: 0,
      errors: [],
      mallId: this.props.shop.mallId || null,
      attachments: this.props.shop.attachments ? [...this.props.shop.attachments] : []
    }

  }
  onRemoveAttachment = (attachmentId) => {
    // remove the attachment from the actual database, than update the local state
    // this differs from the add shop form, where we are just removing the item from local state
    // rather than using some wild if/then in the resolver on the server, just get rid of the document right now
    // then any attachments sent on submission will be either (a) new attachments or (b) previous attachments 
    // from when the document was added or last edited
    this.props.removeAttachment({variables: { attachmentId}})
    .then(res => {
      let attachments = this.state.attachments;
       _.remove(attachments, {_id: attachmentId});
      this.setState({ attachments });
    })
    
  }
  onAttachmentChange = (url) => {
    let attachment = { _id: uuidV4(), url }; // the attachment to be pushed into the new state
    let attachments = [attachment, ...this.state.attachments]
    this.setState({ attachments });
  }
  onSuccessfulSubmit = (res) => {
    // if no attachments were added, then just return from this function and complete submission
    if (!this.state.attachments || this.state.attachments.length === 0) {
      this.props.data.refetch();
      this.props.navigation.goBack();
      return this.setState({ loading: false, errors: [] });
    }

    // massage array of attachment URLs into an array of graphql custom input type [ImageObject] 
    // which is defined on server in imports/api/schema.js
    // store this [ImageObject] array in images
    let images = this.state.attachments.map( item => {
      let image = { url: item.url, name: item._id };
      return image
    });

    // build variables object to pass to the addAttachments mutation
    // shopId, userId, and an [ImageObject] array (see above code/notes)
    let variables = {
      shopId: res.data.saveShop._id,
      userId: res.data.saveShop.owner._id,
      images: images
    }
    // run addAttachments mutation, then refetch queries, then go back to last page
    this.props.addAttachments({ variables })
      .then(()=>{
        //this.props.data.refetch();
        this.props.navigation.goBack();
        return this.setState({ loading: false, errors: [] });
      })
      .catch(err => {
        //let newErrors = errors.concat(err && err.graphQLErrors && err.graphQLErrors.length > 0 && err.graphQLErrors.map( err => err.message ));
        return this.setState({loading: false, errors: [] });
      });
  }
  onSubmit = () => {
    const { title, description, categories, image, phone, email, mallId, website } = this.state;
    const { mutate, navigation, location, data, shop } = this.props;
    let errors = [];
    this.setState({loading: true})

    let params = { title, description, categories, image, phone, email, mallId, website };
    let variables = { _id: shop._id, params }

    if (!title || !description || !categories || !image) {
      if (!title) { errors.push('title is required') }
      if (!description) { errors.push('description is required') }
      if (!categories) { errors.push('categories is required') }
      if (!image) { errors.push('a main image is required!') }
      return this.setState({loading: false, errors: errors});
    }

    //, refetchQueries: [ 'shops', 'shopsByOwner']
    mutate({ variables })
    .then(res => this.onSuccessfulSubmit(res))
    .catch(err => {
      console.log(err)
      //let newErrors = errors.concat(err && err.graphQLErrors && err.graphQLErrors.length > 0 && err.graphQLErrors.map( err => err.message ));
      return this.setState({loading: false, errors});
    });

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
          onRemoveImage={()=>this.setState({image: null})}
          onImageChange={(image)=>this.setState({image})}
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
        
        {/*
          // NOTE: Probably dont need to show possible duplicates on edit screen?
          <PossibleDuplicates {...this.props} />
        */}

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

        <AttachmentsArea 
          onRemoveAttachment={this.onRemoveAttachment}
          onAttachmentChange={this.onAttachmentChange}
          attachments={this.state.attachments}
        />
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

const ComponentWithData = graphql(SAVE_SHOP)(
  graphql(FETCH_MALLS, { name: 'malls' })(
    graphql(ADD_ATTACHMENTS, { name: 'addAttachments' })(
      graphql(REMOVE_ATTACHMENT, { name: 'removeAttachment' })(EditShopForm)
    )
  )
);

/*const ComponentWithData = graphql(FETCH_EXISTING_SHOPS, {
  options: (props) => {
    let variables = {
      string: props.title && props.title.length > 4 ? props.title : null, //if user has not typed in at least 4 characters yet, then do not search for duplicates
    };
    return { variables } 
  }
})(graphql(SAVE_SHOP)(
    graphql(FETCH_MALLS, { name: 'malls' })(EditShopForm)
  )
);*/

let mapStateTopProps = ({ addShopForm }) => {
  return {
    title: addShopForm.title
  }
}

// EXPORT
// ====================================
export default connect( mapStateTopProps, actions )(ComponentWithData);


//export default graphql(CREATE_SHOP, options)(AddShopForm);

