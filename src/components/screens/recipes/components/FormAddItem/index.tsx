import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { Recipe } from '@screens/recipes/index.types'
import { getDBConnection, saveRecipeItems } from '@kcalview/src/database/recipes';

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
            const rowId = await saveRecipeItems(db, [{ title: newRecipe, id: 0 }]);
            const newRecipes = [...recipes, {
                title: newRecipe,
                id: rowId
            }];

            setRecipes(newRecipes);
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

            <TextInput
                multiline
                numberOfLines={4}
            // value={setDescription}
            // onChangeText={(Description) => { setDescription(Description) }}
            />

            <Button
                onPress={addRecipe}
                accessibilityLabel="Add Recipe">
                Add Recipe
            </Button>
        </View>
    );
};