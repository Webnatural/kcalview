import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {Props} from './index.types';
import {styles} from './index.styles';
import {sharedStyles} from '../../shared/index.styles';

export default function AboutScreen({route, navigation}: Props) {
  return (
    <View style={styles.aboutScreenContainer}>
      <TouchableOpacity
        style={sharedStyles.fullWidthButton}
        onPress={() => navigation.navigate('Home')}>
        <Text style={sharedStyles.fullWidthButtonText}>Go home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={sharedStyles.fullWidthButton}
        onPress={() => navigation.goBack()}>
        <Text style={sharedStyles.fullWidthButtonText}>Go back</Text>
      </TouchableOpacity>
    </View>
  );
}
