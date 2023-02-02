import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { Recipe } from '@screens/recipes/index.types'
import { getDBConnection, saveRecipeItems } from '@db';

type FormAddItemProps = {
    recipes: Recipe[];
    setRecipes: (value: Recipe[]) => void;
};

export default function FormAddItem({
    recipes,
    setRecipes,
}: FormAddItemProps) {

    const [newRecipe, setNewRecipe] = useState('');

    const addRecipe = async () => {

        if (!newRecipe.trim()) return;

        try {
            const db = await getDBConnection();
            const newRecipes = [...recipes, {
                title: newRecipe
            }];

            setRecipes(newRecipes);
            await saveRecipeItems(db, [{ title: newRecipe }]);

            setNewRecipe('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View>
            <TextInput
                value={newRecipe}
                onChangeText={text => setNewRecipe(text)}
            />

            <Button
                onPress={addRecipe}
                accessibilityLabel="Add Recipe">
                Add Recipe
            </Button>
        </View>
    );
};