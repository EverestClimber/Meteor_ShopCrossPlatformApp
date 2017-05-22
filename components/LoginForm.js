import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Image, ActivityIndicator } from 'react-native';
import { Button, Icon } from 'react-native-elements'
//REDUX
import { connect } from 'react-redux';
import * as actions from '../actions';
import { reduxForm, Field } from 'redux-form'
//COMPONENTS
import LoadingScreen from './LoadingScreen';
import AuthLink from './AuthLink'
//MODULES
import { colorConfig, stylesConfig } from '../modules/config';
import apollo from '../ApolloClient.js';
import { loginWithPassword, userId } from 'meteor-apollo-accounts'

const { basicHeaderStyle, titleStyle } = stylesConfig;


const ErrorsArea = (errors) => {
  return (
    <View style={{textAlign: 'center'}}>
      {errors.map(item => <Text key={item}>{item}</Text>)}
    </View>
  );
}


class LoginForm extends React.Component {
  
  state = { loading: false, errors: [] }

 onSuccessfulLogin = () => {
        apollo.resetStore();
        this.setState({loading: false});
        return this.props.navigation.navigate('main');
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
        const id = await loginWithPassword({ email, password }, apollo)
        return this.onSuccessfulLogin();
    } catch (err) {

        if (Platform.OS === 'android') {
          // and if they are on andoird, then check to see if their userId exists (await userId()),
          // then we can assume the user was signed up correctly, theyre just having the aforementioend android problem
          if (await userId()){ return this.onSuccessfulLogin(); }
        }

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
        title='LOGIN'
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
          label='Or signup' 
          toggleForm={() => toggleForm('signup')} 
        />
        <AuthLink 
          label='Forgot your password?' 
          toggleForm={() => toggleForm('forgot')} 
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
    fontFamily: 'proximanovasoft-regular',
  }
})



export default LoginForm