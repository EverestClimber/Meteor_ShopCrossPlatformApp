import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
//MODULES
import { colorConfig } from '../modules/config';



class LoadingScreen extends React.Component {
  render(){
      const { loadingMessage } = this.props;
       return (
          <View style={styles.container}>
            <View>
              <ActivityIndicator color={colorConfig.business} size='large' />
              <Text style={styles.header}>{ loadingMessage }</Text>
            </View>
          </View>
      );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    backgroundColor: '#f5f5f5'
  },
  header: {
    fontFamily: 'proximanovasoft-regular',
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 10
  },
});


export default LoadingScreen;