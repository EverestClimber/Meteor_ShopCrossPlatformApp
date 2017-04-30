import React from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet, Platform, ActivityIndicator } from 'react-native';
//REDUX
import { connect } from 'react-redux';
import * as actions from '../actions';
import { reduxForm, Field } from 'redux-form'
//COMPONENTS
import LoadingScreen from './LoadingScreen'
//MODULES
import { colorConfig } from '../modules/config';


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
  state = { loading: false }
  onSubmit = (values) => {
    this.setState({loading: true});
    this.props.submitContactUsForm(values, () => {
      this.setState({loading: false});
    });
  }
  render(){
    const { handleSubmit } = this.props;

    if(this.state.loading) {
       return (
          <LoadingScreen loadingMessage={'Submitting your message...'} />
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.labelStyle}>Email:</Text>
        <Field name="email" component={renderTextInput} />
        <Text style={styles.labelStyle}>Message:</Text>
        <Field name="message" component={renderTextArea} />
        <Button title='SEND MESSAGE' onPress={handleSubmit(this.onSubmit)} style={{backgroundColor: colorConfig.business, marginTop: 10,}} />
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
    fontFamily: 'proximanovasoft-regular',
  }
})

let ContactUsForm = reduxForm({
  form: 'ContactUsForm'
})(ContactUs);

export default signInForm = connect(null, actions)(ContactUsForm);