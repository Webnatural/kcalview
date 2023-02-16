import * as React from 'react';
import { Button } from 'react-native-paper';
import { useNavigation, RouteProp } from '@react-navigation/native';

export type GoToButtonProps = {
    screenName: string | 'Home';
    mode?: "text" | "outlined" | "contained" | "elevated" | "contained-tonal" | undefined;
    icon: string;
}
export type Navigate = {
    navigate: (value: string) => void;
}


export default function GoToButton({ screenName, icon, mode }: GoToButtonProps) {
    const { navigate } = useNavigation<Navigate>()

    return (<Button
        onPress={() => navigate(screenName)}
        icon={icon}
        mode={mode}>
        {`Go to ${screenName}`}
    </Button>
    );
}