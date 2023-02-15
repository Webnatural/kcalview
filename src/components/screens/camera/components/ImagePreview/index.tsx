import React from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import { IconButton } from 'react-native-paper';
import { TextRecognitionResult } from '@react-native-ml-kit/text-recognition';

import { styles } from './index.styles';
import TextMap from './components/TextMap';

type ImagePreviewProps = {
  previewImgPath: string;
  setPreviewImgPath: (value: string | null) => void;
  textFromImage: TextRecognitionResult | null;
};

export default function ImagePreview({
  previewImgPath,
  setPreviewImgPath,
  textFromImage,
}: ImagePreviewProps) {
  return (
    <View style={styles.imagePreviewContainer}>
      <Image source={{ uri: previewImgPath }} style={[styles.image]} />

      {!textFromImage ? (
        <ActivityIndicator />
      ) : (
        <>
          <TextMap text={textFromImage.text} blocks={textFromImage.blocks} />
          {/* <IconButton
            style={styles.closeButton}
            mode="contained"
            icon="close"
            onPress={() => setPreviewImgPath(null)}
          /> */}
        </>
      )}
    </View>
  );
}
