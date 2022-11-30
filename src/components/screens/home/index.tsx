import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {HomeProps} from '../../../types/navstack/root/index.types';
import {styles} from '../../shared/index.styles';
import {homeScreenStyles} from './index.styles';

export default function HomeScreen({route, navigation}: HomeProps) {
  return (
    <View style={homeScreenStyles.homeScreenContainer}>
      <TouchableOpacity
        style={styles.fullWidthButton}
        onPress={() => navigation.navigate('Camera')}>
        <Text style={styles.fullWidthButtonText}>Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.fullWidthButton}
        onPress={() => navigation.navigate('About')}>
        <Text style={styles.fullWidthButtonText}>About</Text>
      </TouchableOpacity>
    </View>
  );
}
