import React, {useState, useEffect} from 'react';
import {View, Image, ActivityIndicator} from 'react-native';
import {IconButton, Button} from 'react-native-paper';
import {styles} from './index.styles';
import TextRecognition, {
  TextRecognitionResult,
} from '@react-native-ml-kit/text-recognition';
import TextMap from './components/TextMap';

type ImagePreviewProps = {
  previewImage: string;
  setPreviewImage: (value: string | null) => void;
};

export default function ImagePreview({
  previewImage,
  setPreviewImage,
}: ImagePreviewProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TextRecognitionResult>();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await TextRecognition.recognize('file://' + previewImage);
      setResult(result);
      setLoading(false);
    })();
  }, []);

  return loading ? (
    <View style={styles.ImagePreviewContainer}>
      <Image source={{uri: 'file://' + previewImage}} style={[styles.Image]} />
      {result && <TextMap text={result.text} blocks={result.blocks} />}
      <ActivityIndicator />
    </View>
  ) : (
    <View style={styles.ImagePreviewContainer}>
      <Image source={{uri: 'file://' + previewImage}} style={[styles.Image]} />
      {result && <TextMap text={result.text} blocks={result.blocks} />}
      <IconButton
        style={styles.CloseButton}
        mode="contained"
        icon="close"
        onPress={() => setPreviewImage(null)}
      />
    </View>
  );
}
