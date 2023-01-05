import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from './../../navstack/root/index.types';
import { styles } from './index.styles';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: HomeProps) {
  return (
    <View style={styles.homeScreenContainer}>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => navigation.navigate('Camera')}>
        Camera
      </Button>

      <Button
        icon="home"
        mode="contained"
        onPress={() => navigation.navigate('About')}>
        About
      </Button>
    </View>
  );
}
