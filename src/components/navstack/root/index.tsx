import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../screens/home';
import CameraScreen from '../../screens/camera';
import AboutScreen from '../../screens/about';
import {RootStackParamList} from '../../navstack/root/index.types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function NavStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
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
