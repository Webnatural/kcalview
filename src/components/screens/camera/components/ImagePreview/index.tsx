import React from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import { TextRecognitionResult } from '@react-native-ml-kit/text-recognition';

import FormAddItem from '@screens/camera/components/FormAddItem';
import { styles } from './index.styles';
import TextMap from './components/TextMap';

type ImagePreviewProps = {
  previewImgPath: string;
  setPreviewImgPath: (value: string | null) => void;
  textFromImage: TextRecognitionResult | null;
  showAddRecipe: boolean;
  setAddRecipe: (value: string | null) => void;
};

export default function ImagePreview({
  previewImgPath,
  textFromImage,
}: ImagePreviewProps) {
  return (
    <View style={styles.imagePreviewContainer}>
      <Image source={{ uri: previewImgPath }} style={[styles.image]} />

      {!textFromImage ? (
        <ActivityIndicator />
      ) : (
        <View>
          <TextMap text={textFromImage.text} blocks={textFromImage.blocks} />
          <FormAddItem text={textFromImage.text} />
        </View>
      )}
    </View>
  );
}
