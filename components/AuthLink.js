import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const AuthLink = ({ label, toggleForm, textColor }) => {
  return (
    <TouchableOpacity onPress={() => toggleForm()}>
      <Text style={{marginTop: 25, color: textColor || '#fff', textAlign: 'center'}}>
        { label }
      </Text>
    </TouchableOpacity>
  );
}

export default AuthLink