import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import NavStack from './components/NavStack';

export default function App() {
  return (
    <NavigationContainer>
      <NavStack />
    </NavigationContainer>
  );
}
