import React from 'react';
import { ImagePicker } from 'expo';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Image, ActivityIndicator } from 'react-native';
//REDUX
import { connect } from 'react-redux';
import * as actions from '../actions';
import { reduxForm, Field } from 'redux-form'
//COMPONENTS
import LoadingScreen from './LoadingScreen'
//MODULES
import { colorConfig } from '../modules/config';
import { graphql, withApollo } from 'react-apollo';
import { ADD_REPORT } from '../apollo/mutations'
import { List, Radio, InputItem, SegmentedControl, TextareaItem, WhiteSpace, Button } from 'antd-mobile';
const RadioItem = Radio.RadioItem;


const data = [
      { value: 0, label: 'General' },
      { value: 1, label: 'Suspicious Vehicle' },
      { value: 2, label: 'Suspicious Person' },
      { value: 3, label: 'Checking In' },
      { value: 4, label: 'Checking Out' },
    ];

const renderTextInput = ({ input, ...inputProps }) => {
  return (
    <TextInput
      style={styles.input} 
      onChangeText={input.onChange}
      {...inputProps}
    />
  );
}

const renderTextArea = ({ input, ...inputProps }) => {
  return (
    <TextInput
      multiline={true}
      numberOfLines={4}
      style={styles.textArea} 
      onChangeText={input.onChange}
      {...inputProps}
    />
  );
}

class AddReportForm extends React.Component {
  constructor(props){
    super(props)
    this.state = { loading: false, image: null, 
    value: 0,
  }
    this.pickImage = this.pickImage.bind(this);
  }
  
  onSubmit = () => {
    console.log(this.state)
  }
  /*onSubmit = (values) => {
    if (!values) {
      return console.log(values);
    }
    this.setState({loading: true});
    let report = {
      messageValue: values.messageValue,
      location: this.props.location
    }
    console.log(report);
    this.props.mutate({ variables: { title, content } })
        .then(() => this.setState({ loading: false }))
        .catch( e => console.log('catch ran')  );

  }*/
   async pickImage(){

    try {

      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (!result.cancelled) { return this.setState({ image: result.uri }); }
      return console.log(result);
    }
    catch(e) {
      console.log('error ran');
      return console.log(e);
    }
      

      

      
  }
  render(){
    const { handleSubmit } = this.props;
    let { image } = this.state;
    if(this.state.loading) {
       return (
          <LoadingScreen loadingMessage={'Adding your document...'} />
      );
    }
    //const { value, value2, value3, value4 } = this.state;
    return (
      <List style={{padding: 15}}>
        {/*<Text style={styles.labelStyle}>Content:</Text>*/}
        {/*<Field name="messageValue" component={renderTextArea} />*/}
        <WhiteSpace />
        <List>
          <Button
            title=""
            onPressIn={this.pickImage}
          >Pick an image from camera roll</Button>
          {image &&
            <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </List>
        <WhiteSpace />
        <Text style={styles.labelStyle}>Priority Level:</Text>
        <SegmentedControl
          values={['General', 'Suspicious', 'Urgent']}
          tintColor={colorConfig.business}
          onValueChange={(val)=>this.setState({priorityLevel: val})}
        />
        <WhiteSpace />
        <List renderHeader={() => 'reportTypeo'}>
        {data.map(i => (
          <RadioItem key={i.value} checked={this.state.reportType === i.value} onChange={() => this.setState({reportType: i.value})}>
            {i.label}
          </RadioItem>
        ))}
      </List>
      <WhiteSpace />
        <TextareaItem
            clear
            placeholder="Type your message here..."
            rows={4}
            onChange={(val)=>this.setState({messageValue: val})}
        />
        <WhiteSpace />
        <Button 
          onPressIn={this.onSubmit.bind(this)} 
        >
          ADD REPORT
        </Button>
      </List>
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




export default graphql(ADD_REPORT)(
  reduxForm({form: 'AddReportForm'})(AddReportForm)
);