import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {styles} from '../../../../shared/index.styles';
import {BottomButtonsStyles} from './index.styles';
import {Props} from './index.types';

export default function BottomButtons({takePic}: Props) {
  return (
    <View style={BottomButtonsStyles.BottomButtonsContainer}>
      <TouchableOpacity
        style={styles.fullWidthButton}
        onPress={async () => takePic()}>
        <Text style={styles.fullWidthButtonText}>Take photo</Text>
      </TouchableOpacity>
    </View>
  );
}
