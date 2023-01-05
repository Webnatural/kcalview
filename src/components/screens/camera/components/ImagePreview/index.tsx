import React, { useState, useEffect } from 'react';
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
  textFromImage
}: ImagePreviewProps) {
  return (
    <View style={styles.ImagePreviewContainer}>
      <>
        <Image source={{ uri: 'file://' + previewImgPath }} style={[styles.Image]} />
        {console.log(textFromImage)}

        {!textFromImage ? (
          <ActivityIndicator />
        ) : (
          <>
            <TextMap text={textFromImage.text} blocks={textFromImage.blocks} />
            <IconButton
              style={styles.CloseButton}
              mode="contained"
              icon="close"
              onPress={() => setPreviewImgPath(null)}
            />
          </>
        )}
      </>
    </View>
  );
}
