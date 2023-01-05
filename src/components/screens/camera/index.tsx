import React, { useCallback, useMemo, useEffect, useRef, useState } from 'react';
import { runOnJS } from 'react-native-reanimated';
import uuid from 'react-uuid'; import {
  LayoutChangeEvent,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { OCRFrame, scanOCR } from 'vision-camera-ocr';
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import TextRecognition, {
  TextRecognitionResult,
} from '@react-native-ml-kit/text-recognition';

import Clipboard from '@react-native-clipboard/clipboard';
import BottomButtons from './components/BottomButtons';
import ImagePreview from './components/ImagePreview';
import { styles } from './index.styles';

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(false);
  const [ocr, setOcr] = useState<OCRFrame>();
  const [pixelRatio, setPixelRatio] = useState(1);
  const [previewImgPath, setPreviewImgPath] = useState<string | null>(null);
  const [textFromImage, setTextFromImage] = useState<TextRecognitionResult | null>(null);

  const cameraRef = useRef<Camera>(null);

  const devices = useCameraDevices();
  const device = useMemo(() => devices.back, [devices.back]);

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    runOnJS(setOcr)(scanOCR(frame));
  }, []);

  const takePic = async () => {
    try {
      if (!cameraRef.current) {
        return
      };

      const photo = await cameraRef.current.takeSnapshot({
        quality: 0.95,
        skipMetadata: true,
      });

      setPreviewImgPath(photo.path);

      const data = await TextRecognition.recognize('file://' + photo.path);

      setTextFromImage(data);

    } catch (error) {
      /** @todo: Weryfikacja błędów */
      console.log(error);
      return;
    }
  };

  const renderOverlay = useCallback(() => {

    if (!ocr) {
      return null;
    }

    return ocr?.result.blocks.map(block => {

      const lineHeight = block.lines[0].frame.height;

      const fontSize: any = lineHeight < 24 ? styles.minText : lineHeight - 16;

      const touchablePos = {
        left: block.frame.x * pixelRatio,
        top: block.frame.y * pixelRatio,
      };

      const copyToClipboard = () => {
        Clipboard.setString(block.text);
      }

      return (
        <TouchableOpacity
          key={uuid()}
          onPress={copyToClipboard}
          style={[
            styles.touchable,
            touchablePos
          ]}>
          <Text
            style={[
              styles.text,
              fontSize
            ]}>
            {block.text}
          </Text>
        </TouchableOpacity>
      );
    });
  }, [ocr, pixelRatio]);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  return device && hasPermission ? (
    <>
      {!previewImgPath ? (
        <>
          <Camera
            style={[StyleSheet.absoluteFill]}
            frameProcessor={frameProcessor}
            device={device}
            ref={cameraRef}
            isActive
            frameProcessorFps={1}
            orientation="portrait"
            photo
            onLayout={({
              nativeEvent: {
                layout: { width },
              },
            }: LayoutChangeEvent) => {
              setPixelRatio(
                width / PixelRatio.getPixelSizeForLayoutSize(width),
              );
            }}
          />
          {renderOverlay()}
          <BottomButtons takePic={takePic} previewImgPath={previewImgPath} />
        </>
      ) : (

        <ImagePreview
          previewImgPath={previewImgPath}
          setPreviewImgPath={setPreviewImgPath}
          textFromImage={textFromImage}

        />
      )}

    </>
  ) : (
    <View>
      <Text>No available cameras</Text>
    </View>
  );
}
