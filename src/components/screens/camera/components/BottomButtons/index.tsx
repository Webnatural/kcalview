import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {sharedStyles} from '../../../../shared/index.styles';
import {styles} from './index.styles';
import {Props} from './index.types';

export default function BottomButtons({takePic, previewImage}: Props) {
  return (
    <View style={styles.BottomButtonsContainer}>
      {previewImage ? (
        <TouchableOpacity
          style={sharedStyles.fullWidthButton}
          // onPress={setPreviewImage(null)}
        >
          <Text style={sharedStyles.fullWidthButtonText}>Cancel</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={sharedStyles.fullWidthButton}
          onPress={async () => takePic()}>
          <Text style={sharedStyles.fullWidthButtonText}>Take photo</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
