/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  Button,
  StyleSheet,
  View,
  Text
} from 'react-native';

export default function AboutScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>About Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}