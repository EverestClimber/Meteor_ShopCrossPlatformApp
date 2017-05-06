import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import { Button, Icon } from 'react-native-elements'
//REDUX
import { connect } from 'react-redux';
import * as actions from '../actions';
import { reduxForm, Field } from 'redux-form'
//COMPONENTS
import LoadingScreen from './LoadingScreen'
//MODULES
import { colorConfig, stylesConfig } from '../modules/config';
import { createUser } from 'meteor-apollo-accounts'
import apollo from '../ApolloClient.js';


const handleSignup = (email, password, profile) => {

  createUser({email, password, profile}, apollo)
    .then(userId => apollo.resetStore() )
    .catch( res => console.log(res) );

};


const { basicHeaderStyle, titleStyle } = stylesConfig;

const renderTextInput = ({ input, ...inputProps }) => {
  return (
    <TextInput
      style={styles.input} 
      onChangeText={input.onChange}
      {...inputProps}
    />
  );
}


class Login extends React.Component {
  state = { loading: false }
  static navigationOptions = {
    title: 'Home',
    tabBarIcon: ({ tintColor }) => <Icon name="home" size={30} color={tintColor} />,
      headerTitleStyle: titleStyle, 
      tabBarLabel: 'Home',
      headerVisible: true, //Platform.OS !== 'android',
      headerStyle: basicHeaderStyle
  };

  onSubmit = ({ firstName, lastName, cell, email, password, }) => {
    
    this.setState({loading: true});
    
    let profile = { firstName, lastName, cell }
    
    createUser({ email, password, profile }, apollo)
      .then(userId => {
        apollo.resetStore();
        this.setState({loading: false});
        this.props.navigation.navigate('main');
      })
      .catch( res => console.log(res) );
  }
  render(){
    const { handleSubmit } = this.props;

    if (this.state.loading) {
       return <LoadingScreen loadingMessage={'Logging in...'} />;
    }


    return (
      <View>
        <Text style={styles.labelStyle}>First Name:</Text>
        <Field name="firstName" component={renderTextInput} />
        <Text style={styles.labelStyle}>Last Name:</Text>
        <Field name="lastName" component={renderTextInput} />
        <Text style={styles.labelStyle}>Cellphone:</Text>
        <Field name="cell" component={renderTextInput} />
        <Text style={styles.labelStyle}>Email:</Text>
        <Field name="email" component={renderTextInput} />
        <Text style={styles.labelStyle}>Password:</Text>
        <Field name="password" component={renderTextInput} />
        <Button 
          title='SIGN UP'
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

let SignupForm = reduxForm({
  form: 'SignupForm'
})(Login);

export default signupForm = connect(null, actions)(SignupForm);