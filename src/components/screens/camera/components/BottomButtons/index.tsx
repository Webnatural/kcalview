import React from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';

import { styles } from './index.styles';

type BottomButtonProps = {
  takePic: () => Promise<void>;
};

export default function BottomButtons({ takePic }: BottomButtonProps) {
  return (
    <View style={styles.bottomButtonsContainer}>
      <IconButton
        icon="camera"
        mode="contained"
        style={[styles.takePicButton]}
        onPress={takePic}
      />
    </View>
  );
}
