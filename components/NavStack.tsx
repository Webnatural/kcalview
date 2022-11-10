/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import CameraScreen from './Screens/CameraScreen';
import AboutScreen from './Screens/AboutScreen';
import {
  Button,
  StyleSheet,
  View,
  Text
} from 'react-native';

const forFade = ({ current, next }) => {
  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 0
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return {
    leftButtonStyle: { opacity },
    rightButtonStyle: { opacity },
    titleStyle: { opacity },
    backgroundStyle: { opacity },
  };
};

const Stack = createNativeStackNavigator();


export default function NavStack() {
  return (

    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerStyleInterpolator: forFade }}
      />
      <Stack.Screen
        name="Camera"
        component={CameraScreen}
        options={{
        headerStyleInterpolator: forFade,
         headerShown: false
         }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{ headerStyleInterpolator: forFade }}
      />
    </Stack.Navigator>
  );
}