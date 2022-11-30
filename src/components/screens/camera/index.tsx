import React from 'react';
import {useMemo} from 'react';
import uuid from 'react-uuid';
import {Props} from './index.types';
import {cameraStyles} from './index.styles';
import Clipboard from '@react-native-clipboard/clipboard';
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
  const [hasPermission, setHasPermission] = React.useState(false);
  const [ocr, setOcr] = React.useState<OCRFrame>();
  const [pixelRatio, setPixelRatio] = React.useState(1);
  const devices = useCameraDevices();
  const device = useMemo(() => devices.back, [devices.back]);

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
          return (
            <TouchableOpacity
              key={uuid()}
              onPress={() => {
                Clipboard.setString(block.text);
                Alert.alert(`"${block.text}" copied to the clipboard`);
              }}
              style={[
                cameraStyles.touchable,
                {
                  left: block.frame.x * pixelRatio,
                  top: block.frame.y * pixelRatio,
                },
              ]}>
              <Text style={[cameraStyles.text]}>{block.text}</Text>
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
        isActive
        frameProcessorFps={5}
        onLayout={(event: LayoutChangeEvent) => {
          setPixelRatio(
            event.nativeEvent.layout.width /
              PixelRatio.getPixelSizeForLayoutSize(
                event.nativeEvent.layout.width,
              ),
          );
        }}
      />
      {renderOverlay()}
    </>
  ) : (
    <View>
      <Text>No available cameras</Text>
    </View>
  );
}