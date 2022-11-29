import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  About: undefined;
  Camera: undefined;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'About',
  'Camera'
>;

export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type AboutProps = NativeStackScreenProps<RootStackParamList, 'About'>;
export type CameraProps = NativeStackScreenProps<RootStackParamList, 'Camera'>;
