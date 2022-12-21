import React from 'react';
import uuid from 'react-uuid';
import {styles} from './index.styles';
import {TouchableOpacity, Text} from 'react-native';
import {TextRecognitionResult} from '@react-native-ml-kit/text-recognition';
import Clipboard from '@react-native-clipboard/clipboard';

export default function TextMap({text, blocks}: TextRecognitionResult) {
  blocks.map(block =>
    block.lines.map(line => line.elements.map(el => console.log(el.text))),
  );

  return (
    <>
      <TouchableOpacity
        key={uuid()}
        onPress={() => {
          Clipboard.setString(text);
        }}
        style={styles.touchable}>
        <Text>{text}</Text>
      </TouchableOpacity>
    </>
  );
}
