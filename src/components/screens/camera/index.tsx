import React, {useCallback, useMemo, useEffect, useRef, useState} from 'react';
import uuid from 'react-uuid';
import {styles} from './index.styles';
import Clipboard from '@react-native-clipboard/clipboard';
import BottomButtons from './components/BottomButtons';
import ImagePreview from './components/ImagePreview';
import {runOnJS} from 'react-native-reanimated';
import {
  StyleSheet,
  View,
  Text,
  LayoutChangeEvent,
  PixelRatio,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {OCRFrame, scanOCR} from 'vision-camera-ocr';
import {
  useCameraDevices,
  useFrameProcessor,
  Camera,
} from 'react-native-vision-camera';

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(false);
  const [ocr, setOcr] = useState<OCRFrame>();
  const [pixelRatio, setPixelRatio] = useState(1);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const devices = useCameraDevices();
  const device = useMemo(() => devices.back, [devices.back]);
  const cameraRef = useRef<Camera>(null);

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const data = scanOCR(frame);
    runOnJS(setOcr)(data);
  }, []);

  const takePic = async () => {
    try {
      if (!cameraRef.current) return;

      const photo = await cameraRef.current.takeSnapshot({
        quality: 0.95,
        skipMetadata: true,
      });

      setPreviewImage(photo.path);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  const renderOverlay = useCallback(() => {
    if (!ocr) return null;

    return ocr?.result.blocks.map(block => {
      const lineHeight = block.lines[0].frame.height;
      return (
        <TouchableOpacity
          key={uuid()}
          onPress={() => {
            Clipboard.setString(block.text);
            Alert.alert(`"${block.text}" copied to the clipboard`);
          }}
          style={[
            styles.touchable,
            {
              left: block.frame.x * pixelRatio,
              top: block.frame.y * pixelRatio,
            },
          ]}>
          <Text
            style={[
              styles.text,
              {
                fontSize: lineHeight < 24 ? 8 : lineHeight - 16,
              }, // 8 * 2 is the vertical padding amount
            ]}>
            {block.text}
          </Text>
        </TouchableOpacity>
      );
    });
  }, [ocr?.result.blocks, pixelRatio]);

  return device && hasPermission ? (
    <>
      {!previewImage && (
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
              layout: {width},
            },
          }: LayoutChangeEvent) => {
            setPixelRatio(width / PixelRatio.getPixelSizeForLayoutSize(width));
          }}
        />
      )}

      {previewImage && (
        <ImagePreview
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
        />
      )}

      {!previewImage && renderOverlay()}

      {!previewImage && (
        <BottomButtons
          takePic={takePic}
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
        />
      )}
    </>
  ) : (
    <View>
      <Text>No available cameras</Text>
    </View>
  );
}
