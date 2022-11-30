import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {Props} from './index.types';
import {aboutStyles} from './index.styles';
import {styles} from '../../shared/index.styles';

export default function AboutScreen({route, navigation}: Props) {
  return (
    <View style={aboutStyles.aboutScreenContainer}>
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
