import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {AboutProps} from '../../types/NavStack';
import {aboutStyles} from './AboutScreen.styles';

export default function AboutScreen({route, navigation}: AboutProps) {
  return (
    <View style={aboutStyles.aboutScreen}>
      <Text>About Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={aboutStyles.touchableBtn}>Go home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={aboutStyles.touchableBtn}>Go back</Text>
      </TouchableOpacity>
    </View>
  );
}
