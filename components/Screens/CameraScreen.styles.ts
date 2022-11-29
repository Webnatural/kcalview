import {StyleSheet} from 'react-native';
import {TextBlock} from '../../types/Screens/CameraScreen';

export const overlayStyles = (block: TextBlock, pxRatio: number) =>
  StyleSheet.create({
    touchableOpacity: {
      position: 'absolute',
      left: block.frame.x * pxRatio,
      top: block.frame.y * pxRatio,
      backgroundColor: 'rgba(0,0,0,0.1)',
      padding: 8,
      borderRadius: 6,
    },
  });

export const textStyles = StyleSheet.create({
  touchableOpacity: {
    fontSize: 25,
    justifyContent: 'center',
    textAlign: 'center',
  },
});
