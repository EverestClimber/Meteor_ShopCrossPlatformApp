import React from 'react';
import { ImagePicker, Permissions } from 'expo';
import { List, Radio, InputItem, SegmentedControl, TextareaItem, Checkbox } from 'antd-mobile';
import { View, Text, TextInput, ScrollView, Alert, TouchableOpacity, StyleSheet, Platform, Image, ActivityIndicator } from 'react-native';
//REDUX
import _ from 'lodash';
//COMPONENTS
import LoadingScreen from './LoadingScreen'
import { Button, Icon } from 'react-native-elements'
//MODULES
import { colorConfig,  } from '../modules/config';
import { handleFileUpload, CATEGORY_OPTIONS,  } from '../modules/helpers';
// APOLLO
import { graphql, withApollo } from 'react-apollo';
import { FETCH_EXISTING_SHOPS, SEARCH_SHOPS_BY_OWNER, FETCH_MALLS } from '../apollo/queries'
import { CREATE_SHOP } from '../apollo/mutations'
import client from '../ApolloClient';
// REDUX
import { connect } from 'react-redux'
import * as actions from '../actions';

const RadioItem = Radio.RadioItem;
const CheckboxItem = Checkbox.CheckboxItem;



const ImageArea = ({ image, onImageClick, onImageCameraClick, onRemoveImage, imageLoading }) => {

  if (imageLoading) {
    return (
      <View style={{marginBottom: 15, marginTop: 15}}>
        <ActivityIndicator />
      </View>
    );
  }


  return (
    <View style={{marginBottom: 15, marginTop: 15}}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            {!image && <Button title='Upload' icon={{ name: 'file-upload' }} onPress={() => onImageClick()} />}
          </View>
          <View style={{flex: 1}}>
            {!image && <Button title='Camera' icon={{ name: 'camera-alt' }} onPress={() => onImageCameraClick()} />}
          </View>
        </View>
        <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          {image && (
            <View style={{flex: 1}}>
              <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />
              <Icon
                name='cancel'
                color='#888'
                onPress={() => onRemoveImage()}
              />
            </View>
          )}
        </View>
    </View>
  );
}

export default ImageArea;