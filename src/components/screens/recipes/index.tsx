import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '@navstack/root/index.types';
import RecipesList from './components/list';
import { Button } from 'react-native-paper';
import { styles } from './index.styles';

type RecipesProps = NativeStackScreenProps<RootStackParamList, 'Recipes'>;

export default function RecipesScreen({ navigation }: RecipesProps) {
    return (
        <View style={styles.recipesScreenContainer}>
            <Button
                icon="arrow-left"
                mode="contained"
                onPress={() => navigation.navigate('Home')}>
                Camera
            </Button>

            <Button
                icon="arrow-left"
                mode="contained"
                onPress={() => navigation.goBack()}>
                Camera
            </Button>

            <RecipesList />
        </View>
    );
}
