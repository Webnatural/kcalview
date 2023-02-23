import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export type GoToButtonProps = {
  screenName: string | 'Home';
  mode?:
  | 'text'
  | 'outlined'
  | 'contained'
  | 'elevated'
  | 'contained-tonal'
  | undefined;
  icon: string;
  style?: StyleProp<ViewStyle>;
};

export type Navigate = {
  navigate: (value: string) => void;
};

export default function GoToButton({
  screenName,
  icon,
  mode,
  style,
}: GoToButtonProps) {
  const { navigate } = useNavigation<Navigate>();

  return (
    <Button style={style} onPress={() => navigate(screenName)} icon={icon} mode={mode}>
      {`Go to ${screenName}`}
    </Button>
  );
}
