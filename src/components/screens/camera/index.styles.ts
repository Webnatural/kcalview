import {StyleSheet} from 'react-native';
import {TextBlock} from './index.types';

export const styles = StyleSheet.create({
  touchable: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 8,
    borderRadius: 6,
  },
  text: {
    fontSize: 25,
    justifyContent: 'center',
    textAlign: 'center',
  },
});
