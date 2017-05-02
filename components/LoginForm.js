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

const ErrorsArea = (errors) => {
  return (
    <View style={{textAlign: 'center'}}>
      {errors.map(item => <Text key={item}>{item}</Text>)}
    </View>
  );
}


class Login extends React.Component {
  state = { loading: false, errors: [] }
 

  onSubmit = ({email, password}) => {
    let _this = this
    if (!email || !password) {
      return 
    }
    _this.setState({loading: true});
    _this.props.handleLogin({email, password}, (err, res) => {
      if (err) {
        console.log(err);
        return _this.setState({loading: false, errors: err });
      }
      _this.setState({loading: false});
      _this.props.navigation.navigate('main');
    });
  }
  render(){
    const { handleSubmit } = this.props;

    if(this.state.loading) {
       return (
          <LoadingScreen loadingMessage={'Logging in...'} />
      );
    }

    return (
      <View>
        <Text style={styles.labelStyle}>Email:</Text>
        <Field name="email" component={renderTextInput} />
        <Text style={styles.labelStyle}>Password:</Text>
        <Field name="password" component={renderTextInput} secureTextEntry />
        <Button 
          title='LOGIN'
          backgroundColor={colorConfig.business} 
          onPress={handleSubmit(this.onSubmit)} 
          style={{marginTop: 10}} 
        />
        {this.state.errors.length > 0 && this.state.errors.map(item => <Text key={item}>{item}</Text>)}
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

let LoginForm = reduxForm({
  form: 'LoginForm'
})(Login);

export default loginForm = connect(null, actions)(LoginForm);

