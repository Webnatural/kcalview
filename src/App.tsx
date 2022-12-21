import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import NavStack from '@navstack/root';

import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <NavStack />
      </NavigationContainer>
    </PaperProvider>
  );
}
