import React from 'react';
import {View, Image} from 'react-native';
import {Props} from './index.types';
import {sharedStyles} from '../../../../shared/index.styles';
import {styles} from './index.styles';

export default function ImagePreview({path}: Props) {
  return path ? (
    <View style={[{flex: 1}]}>
      <Image
        source={{uri: path}}
        style={[{flex: 1, backgroundColor: 'rgba(0,0,0,0.2)'}]}
      />
    </View>
  ) : null;
}
