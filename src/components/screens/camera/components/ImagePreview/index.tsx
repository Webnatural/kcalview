import React from 'react';
import {TouchableOpacity, View, Text, Image, ScrollView} from 'react-native';
import {IconButton} from 'react-native-paper';
import {sharedStyles} from '../../../../shared/index.styles';
import {styles} from './index.styles';

type ImagePreviewProps = {
  previewImage: string;
  setPreviewImage: (value: string | null) => void;
};

export default function ImagePreview({
  previewImage,
  setPreviewImage,
}: ImagePreviewProps) {
  return (
    <View style={[{flex: 1}]}>
      <Image source={{uri: 'file://' + previewImage}} style={[{flex: 1}]} />
      <IconButton
        style={[{position: 'absolute', top: 0, end: 0}]}
        mode="contained"
        icon="close"
        // iconColor="white"
        onPress={() => setPreviewImage(null)}
      />
    </View>
  );
}
