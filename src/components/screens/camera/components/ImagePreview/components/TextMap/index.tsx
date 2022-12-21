import React from 'react';
import uuid from 'react-uuid';
import {styles} from './index.styles';
import {TouchableOpacity, Text} from 'react-native';
import {TextRecognitionResult} from '@react-native-ml-kit/text-recognition';
import Clipboard from '@react-native-clipboard/clipboard';

export default function TextMap({blocks}: TextRecognitionResult) {
  return (
    <>
      {blocks.map(block => (
        <React.Fragment key={uuid()}>
          <TouchableOpacity
            onPress={() => {
              Clipboard.setString(block.text);
              console.log(block.text);
            }}
            style={[styles.text, block.frame]}>
            <Text>{block.text}</Text>
          </TouchableOpacity>
          {/* Lines will be useful for creating lists of items */}
          {/* {block.lines.map(line => line.elements.map(el => console.log(el)))} */}
        </React.Fragment>
      ))}
    </>
  );
}
