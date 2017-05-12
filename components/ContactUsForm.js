import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, ActivityIndicator } from 'react-native';
//REDUX
import { connect } from 'react-redux';
import * as actions from '../actions';
import { reduxForm, Field } from 'redux-form'
//COMPONENTS
import LoadingScreen from './LoadingScreen'
//MODULES
import { colorConfig, stylesConfig } from '../modules/config';
import { Icon, Button, Card } from 'react-native-elements';

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

class ContactUs extends React.Component {
  state = { loading: false, messageSent: false }
  onSubmit = (values) => {
    this.setState({loading: true});
    setTimeout( () => this.setState({loading: false, messageSent: true }), 2000)
    /*this.props.submitContactUsForm(values, () => {
      this.setState({loading: false});
    });*/
  }
  render(){
    const { handleSubmit } = this.props;


    if(this.state.messageSent) {
       return (
         <View>
          <Text style={{textAlign: 'center'}}>
            We received your message!
          </Text>
         </View>
      );
    }


    if(this.state.loading) {
       return (
          <LoadingScreen loadingMessage={'Submitting your message...'} />
      );
    }

    return (
      <View>
        <Text style={styles.labelStyle}>Message:</Text>
        <Field name="message" component={renderTextArea} />
        <Button
          title='SEND MESSAGE'
          backgroundColor={colorConfig.business} 
          onPress={handleSubmit(this.onSubmit)}
          style={{marginTop: 10}} 
        />
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
  linkText: {
    color: colorConfig.business,
  fontSize: 15,
  fontFamily: stylesConfig.boldFont,
  },
  buttonText: {
    fontFamily: 'proximanovasoft-bold',
    color: '#fff', 
    fontSize: 18,
  },
/*  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },*/
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
    fontFamily: 'proximanovasoft-regular',
  }
})

let ContactUsForm = reduxForm({
  form: 'ContactUsForm'
})(ContactUs);

export default signInForm = connect(null, actions)(ContactUsForm);