import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {Props} from './index.types';
import {sharedStyles} from '../../shared/index.styles';
import {styles} from './index.styles';

export default function HomeScreen({route, navigation}: Props) {
  return (
    <View style={styles.homeScreenContainer}>
      <TouchableOpacity
        style={sharedStyles.fullWidthButton}
        onPress={() => navigation.navigate('Camera')}>
        <Text style={sharedStyles.fullWidthButtonText}>Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={sharedStyles.fullWidthButton}
        onPress={() => navigation.navigate('About')}>
        <Text style={sharedStyles.fullWidthButtonText}>About</Text>
      </TouchableOpacity>
    </View>
  );
}
