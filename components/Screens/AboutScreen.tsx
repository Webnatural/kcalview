import React from 'react';
import {Button, StyleSheet, View, Text} from 'react-native';
import {AboutProps} from '../../types/NavStack';

export default function AboutScreen({route, navigation}: AboutProps) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>About Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
