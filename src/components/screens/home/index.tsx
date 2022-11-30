import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {Props} from './index.types';
import {styles} from '../../shared/index.styles';
import {homeStyles} from './index.styles';

export default function HomeScreen({route, navigation}: Props) {
  return (
    <View style={homeStyles.homeScreenContainer}>
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
