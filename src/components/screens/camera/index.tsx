import React from 'react';
import {useMemo, useRef, useState} from 'react';
import uuid from 'react-uuid';
import {Props} from './index.types';
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

export default function CameraScreen({route, navigation}: Props) {
  const [hasPermission, setHasPermission] = useState(false);
  const [ocr, setOcr] = useState<OCRFrame>();
  const [pixelRatio, setPixelRatio] = useState(1);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const devices = useCameraDevices();
  const device = useMemo(() => devices.back, [devices.back]);
  const cameraRef = useRef<Camera>(null);

  const takePic = async () => {
    try {
      if (cameraRef.current === null) throw new Error('cameraRef is null');
      console.log('Photo is being taken');
      const options = {quality: 0.95, skipMetadata: true, base64: true};
      const photo = await cameraRef.current.takeSnapshot(options);

      if (photo?.path) setPreviewImage(photo.path);
      if (photo) {
        console.log('Picture source', photo);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const data = scanOCR(frame);
    runOnJS(setOcr)(data);
  }, []);

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  const renderOverlay = () => {
    return (
      <>
        {ocr?.result.blocks.map(block => {
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
        })}
      </>
    );
  };

  return device && hasPermission ? (
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
        onLayout={(event: LayoutChangeEvent) => {
          setPixelRatio(
            event.nativeEvent.layout.width /
              PixelRatio.getPixelSizeForLayoutSize(
                event.nativeEvent.layout.width,
              ),
          );
        }}
      />
      {previewImage && <ImagePreview path={previewImage} />}

      <BottomButtons
        takePic={takePic}
        previewImage={previewImage}
        setPreviewImage={setPreviewImage}
      />
      {renderOverlay()}
    </>
  ) : (
    <View>
      <Text>No available cameras</Text>
    </View>
  );
}
