import React from 'react';
import {Button, View, Text} from 'react-native';
import {HomeProps} from '../../types/NavStack';

export default function HomeScreen({route, navigation}: HomeProps) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button title="Camera" onPress={() => navigation.navigate('Camera')} />
      <Button title="About" onPress={() => navigation.navigate('About')} />
    </View>
  );
}
