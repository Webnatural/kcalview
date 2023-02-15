import React, { useState, useEffect } from 'react';
import { launchCamera } from 'react-native-image-picker';
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
    try {
      const result = await launchCamera('capture', setCallbackCamera);

      if (!result) {
        navigation.navigate('Home');
        return;
      }

      if (result.didCancel) {
        navigation.navigate('Home');
        return;
      }

      setTextFromImage(null);

      const { uri } = result.assets[0];
      setPreviewImgPath(uri || null);

      const data = await TextRecognition.recognize(uri);
      setTextFromImage(data);
    } catch (error) {
      /** @todo: Weryfikacja błędów */
      console.error(error);
      return;
    }
  };

  !callbackCamera && !previewImgPath && takePic();

  if (callbackCamera) {
    if (callbackCamera?.didCancel) {
      // () => navigation.navigate('Home')
    }
  }

  // if (previewImgPath) {
  //   if (previewImgPath?.didCancel === true) {

  //     () => navigation.navigate('Home')
  //   }
  // }
  // }, [previewImgPath]);

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
