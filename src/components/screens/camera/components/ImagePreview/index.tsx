import React from 'react';
import { View, Image } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { TextRecognitionResult } from '@react-native-ml-kit/text-recognition';

import FormAddRecipe from '@screens/camera/components/FormAddRecipe';
import { styles } from './index.styles';

type ImagePreviewProps = {
  previewImgPath: string;
  setPreviewImgPath: (value: string | null) => void;
  textFromImage: TextRecognitionResult | null;
};

export default function ImagePreview({
  previewImgPath,
  textFromImage,
}: ImagePreviewProps) {
  return (
    <View style={styles.imagePreviewContainer}>
      <Image source={{ uri: previewImgPath }} style={[styles.image]} />

      {!textFromImage ? (
        <ActivityIndicator animating={true} />
      ) : (
        <FormAddRecipe text={textFromImage.text} blocks={textFromImage.blocks} />
      )}
    </View>
  );
}
