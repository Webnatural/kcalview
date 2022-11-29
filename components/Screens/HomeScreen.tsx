import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {HomeProps} from '../../types/NavStack';
import {homeStyles} from './HomeScreen.styles';

export default function HomeScreen({route, navigation}: HomeProps) {
  return (
    <View style={homeStyles.homeScreen}>
      <Text>Home Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
        <Text style={homeStyles.touchableBtn}>Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('About')}>
        <Text style={homeStyles.touchableBtn}>About</Text>
      </TouchableOpacity>
    </View>
  );
}
