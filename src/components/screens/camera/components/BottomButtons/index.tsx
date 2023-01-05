import React from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { styles } from './index.styles';

type BottomButtonProps = {
  takePic: () => Promise<void>;
  previewImgPath: string | null;
};

export default function BottomButtons({
  takePic,
  previewImgPath,
}: BottomButtonProps) {

  return (
    <View style={styles.BottomButtonsContainer}>
      <IconButton
        icon="camera"
        mode="contained"
        style={[styles.CloseButton]}
        onPress={takePic}></IconButton>
    </View>
  );
}
