import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import HomeScreen from '@screens/home';
import CameraScreen from '@screens/camera';
import AboutScreen from '@screens/about';
import {RootStackParamList} from './index.types';

import {Appbar} from 'react-native-paper';

function ThemedNavigationBar({navigation, back}: NativeStackHeaderProps) {
  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title="ACME App" />
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

      <Stack.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
