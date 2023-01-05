import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '@navstack/root/index.types';
import { styles } from './index.styles';
import { sharedStyles } from '@shared/index.styles';

type AboutProps = NativeStackScreenProps<RootStackParamList, 'About'>;

export default function AboutScreen({ navigation }: AboutProps) {
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
