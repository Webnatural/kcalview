import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {AboutProps} from '../../types/NavStack';
import {aboutScreenStyles} from './AboutScreen.styles';
import {styles} from './Shared.styles';

export default function AboutScreen({route, navigation}: AboutProps) {
  return (
    <View style={aboutScreenStyles.aboutScreenContainer}>
      <TouchableOpacity
        style={styles.fullWidthButton}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.fullWidthButtonText}>Go home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.fullWidthButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.fullWidthButtonText}>Go back</Text>
      </TouchableOpacity>
    </View>
  );
}
