import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import NavStack from './src/components/navstack/root';

export default function App() {
  return (
    <NavigationContainer>
      <NavStack />
    </NavigationContainer>
  );
}
