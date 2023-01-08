import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '@navstack/root/index.types';
import RecipesList from './components/list';
import { styles } from './index.styles';

type RecipesProps = NativeStackScreenProps<RootStackParamList, 'Recipes'>;

export default function RecipesScreen({ navigation }: RecipesProps) {
    return (
        <View style={styles.recipesScreenContainer}>
            <RecipesList />
            <TouchableOpacity
                onPress={() => navigation.navigate('Home')}>
                <Text>Go home</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.goBack()}>
                <Text>Go back</Text>
            </TouchableOpacity>
        </View>
    );
}
