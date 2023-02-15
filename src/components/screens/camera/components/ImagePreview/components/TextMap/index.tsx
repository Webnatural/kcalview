import React from 'react';
import uuid from 'react-uuid';
import { TouchableOpacity, Text } from 'react-native';
import { TextRecognitionResult } from '@react-native-ml-kit/text-recognition';

import { styles } from './index.styles';

export default function TextMap({ text, blocks }: TextRecognitionResult) {
  console.log(JSON.stringify(blocks));

  return (
    <TouchableOpacity
      key={uuid()}
      onPress={() => {
        // Clipboard.setString(text);
      }}
      style={styles.touchable}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
}
