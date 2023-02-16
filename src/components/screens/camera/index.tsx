import React, { useState } from 'react';
import { CameraOptions, launchCamera } from 'react-native-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navstack/root/index.types';

import TextRecognition, {
  TextRecognitionResult,
} from '@react-native-ml-kit/text-recognition';

import ImagePreview from './components/ImagePreview';

type CameraProps = NativeStackScreenProps<RootStackParamList, 'Camera'>;

export default function CameraScreen({ navigation }: CameraProps) {
  const [previewImgPath, setPreviewImgPath] = useState<string | null>(null);
  const [callbackCamera, setCallbackCamera] = useState(null);
  const [textFromImage, setTextFromImage] =
    useState<TextRecognitionResult | null>(null);

  const takePic = async () => {
    const options: CameraOptions = {
      quality: 1,
      mediaType: 'photo',
    };
    try {
      const result = await launchCamera(options, setCallbackCamera);

      if (!result || result.didCancel) {
        navigation.navigate('Home');
        return;
      }

      setTextFromImage(null);

      const uri = Array.isArray(result.assets) && result?.assets[0].uri;
      if (!uri) {
        return;
      }

      setPreviewImgPath(uri);

      const data = await TextRecognition.recognize(uri);
      setTextFromImage(data);
    } catch (error) {
      /** @todo: Weryfikacja błędów */
      console.error(error);
      return;
    }
  };

  !callbackCamera && !previewImgPath && takePic();

  return (
    callbackCamera &&
    previewImgPath && (
      <ImagePreview
        previewImgPath={previewImgPath}
        setPreviewImgPath={setPreviewImgPath}
        textFromImage={textFromImage}
      />
    )
  );
}
