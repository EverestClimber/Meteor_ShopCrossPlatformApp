import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import { Button, Icon } from 'react-native-elements'
//REDUX
import { connect } from 'react-redux';
import * as actions from '../actions';
import { reduxForm, Field } from 'redux-form'
//COMPONENTS
import LoadingScreen from './LoadingScreen';
import AuthLink from './AuthLink';
//MODULES
import { colorConfig, stylesConfig } from '../modules/config';
import { createUser, userId } from 'meteor-apollo-accounts'
import apollo from '../ApolloClient.js';

// CONSTANTS & DESTRUCTURING
// ========================================
const { basicHeaderStyle, titleStyle, regularFont, boldFont } = stylesConfig;


// EXPORTED COMPONENT
// ========================================
class SignupForm extends React.Component {

  state = { loading: false, errors: [] }

  onSuccessfulSignup = () => {
        apollo.resetStore();
        this.setState({loading: false});
        return this.props.navigation.navigate('welcome');
  }
  onSubmit = async () => {

    const { email, password, errors } = this.state;

    this.setState({loading: true, errors: []});

    if (!email || !password) {
      if (!password)  { errors.push('please enter an email') }
      if (!email)     { errors.push('please enter an password') }
      return this.setState({ errors: errors, loading: false });
    }

    email.trim().toLowerCase(); // trim and lowercase the email email
    password.trim(); // trim password

    try {
        const id = await createUser({ email, password }, apollo)
        return this.onSuccessfulSignup()
    } catch (err) {
        // there is a problem with the signup/login on android devices. 
        // The user will be signed in, but an error is thrown regardless
        // a short-term fix for this is to check if the user is on android (Platform.OS === 'android')
        if (Platform.OS === 'android') {
           // and if they are on andoird, then check to see if their userId exists (await userId()),
          // then we can assume the user was signed up correctly, theyre just having the aforementioend android problem
          if (await userId()) { return this.onSuccessfulSignup() }
        }
        // if they are not on android, we can assume it is a real error, 
        // so capture the error and set local state to show the user the error
        let errors = err && err.graphQLErrors && err.graphQLErrors.length > 0 && err.graphQLErrors.map( err => err.message );
        return this.setState({loading: false, errors: errors});
    }

  }
  renderButton() {
    if(this.state.loading) {
       return <ActivityIndicator style={{marginTop: 10}}  />;
    }
    return (
      <Button 
        title='SIGN UP'
        backgroundColor={colorConfig.business} 
        onPress={this.onSubmit} 
        style={{marginTop: 10}} 
      />
    );
  }
  render(){
    const { handleSubmit, navigation, toggleForm } = this.props;

    return (
      <View style={styles.container}>
          <View style={{width: 250}}>
        <TextInput
          style={styles.input} 
          onChangeText={ (val) => this.setState({email: val}) }
          placeholder={'Email'}
        />
        <TextInput
          style={styles.input} 
          onChangeText={ (val) => this.setState({password: val}) }
          secureTextEntry
          placeholder={'Password'}
        />

        <View style={{height: 45}}>
          {this.renderButton()}
        </View>
        
        <View style={{marginTop: 8, marginBottom: 8, alignItems: 'center',  justifyContent: 'center',}}>
          {this.state.errors.length > 0 && this.state.errors.map(item => {
            return <Text key={item} style={{color: '#e74c3c'}}>{item}</Text>
          })}
        </View>

        <AuthLink  
          label='Or login' 
          toggleForm={() => toggleForm('login')} 
        />

        </View>
      </View>
    )
  }
}


// STYLES
// ========================================
const styles = StyleSheet.create({
  labelStyle: {
    fontFamily: regularFont,
    color: '#666',
    textAlign: 'left',
    fontSize: 15,
  },
  buttonText: {
    fontFamily: boldFont,
    color: '#fff', 
    fontSize: 18,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor: 'transparent',
    backgroundColor: '#fff',
    opacity: 0.3,
    borderRadius: 3,
    marginBottom: 8,
    borderWidth: 1,
    padding: 3,
    height: 45,
    fontSize: 15,
    fontFamily: regularFont,
  }
})


export default SignupForm;

