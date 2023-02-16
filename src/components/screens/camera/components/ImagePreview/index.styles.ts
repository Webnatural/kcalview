import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  imagePreviewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
  },
  addButton: {
    position: 'absolute',
    top: 0,
    end: 0,
  },
  image: {
    flex: 1,
    position: 'absolute',
    top: 0,
    end: 0,
    bottom: 0,
    start: 0,
    opacity: 0.2,
  },
});
