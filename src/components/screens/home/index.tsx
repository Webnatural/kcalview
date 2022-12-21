import React from 'react';
import {View} from 'react-native';
import {styles} from './index.styles';
import {Button} from 'react-native-paper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@navstack/root/index.types';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({navigation}: HomeProps) {
  return (
    <View style={styles.homeScreenContainer}>
      <Button
        icon="camera"
        mode="contained"
        // style={sharedStyles.fullWidthButton}
        onPress={() => navigation.navigate('Camera')}>
        Camera
      </Button>
      <Button
        icon="home"
        mode="contained"
        // style={sharedStyles.fullWidthButton}
        onPress={() => navigation.navigate('About')}>
        About
      </Button>
    </View>
  );
}
