import React from 'react';
import {View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {styles} from './index.styles';

type BottomButtonProps = {
  takePic: () => Promise<void>;
  previewImage?: string | null;
  setPreviewImage: (value: string | null) => void;
};

export default function BottomButtons({
  takePic,
  previewImage,
}: BottomButtonProps) {
  return (
    <View style={styles.BottomButtonsContainer}>
      {!previewImage && (
        <IconButton
          icon="camera"
          mode="contained"
          style={[{position: 'absolute', bottom: 10}]}
          onPress={takePic}></IconButton>
      )}
    </View>
  );
}
