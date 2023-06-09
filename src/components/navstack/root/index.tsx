import React from 'react';
import { Appbar } from 'react-native-paper';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';

import AboutScreen from '@components/screens/about';
import CameraScreen from '@components/screens/camera';
import RecipesScreen from '@components/screens/recipes';
import HomeScreen from '@components/screens/home';
import { RootStackParamList } from './index.types';

function ThemedNavigationBar({ navigation, back }: NativeStackHeaderProps) {
  return (
    <Appbar.Header>
      {!!back && <Appbar.BackAction onPress={navigation.goBack} />}
      <Appbar.Content title="My Recipes" />
    </Appbar.Header>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function NavStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: props => <ThemedNavigationBar {...props} />,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />

      <Stack.Screen name="About" component={AboutScreen} />

      <Stack.Screen name="Camera" component={CameraScreen} />

      <Stack.Screen name="Recipes" component={RecipesScreen} />
    </Stack.Navigator>
  );
}
