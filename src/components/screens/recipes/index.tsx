import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navstack/root/index.types';
import { Button, TextInput } from 'react-native-paper';

import { RecipeItemComponent } from '@screens/recipes/components/item';
import { Recipe } from '@screens/recipes/index.types'
import { getDBConnection, getRecipeItems, saveRecipeItems, createTable, deleteRecipeItem } from '@db';

type RecipesProps = NativeStackScreenProps<RootStackParamList, 'Recipes'>;

export default function RecipesScreen({ navigation }: RecipesProps) {

    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [newRecipe, setNewRecipe] = useState('');

    const loadDataCallback = useCallback(async () => {
        try {
            const db = await getDBConnection();
            await createTable(db);
            const storedRecipeItems = await getRecipeItems(db);

            if (storedRecipeItems.length) {
                setRecipes(storedRecipeItems);
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

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

    const deleteItem = async (id: number) => {
        try {
            const db = await getDBConnection();
            const foundIndex = recipes.findIndex(element => element.id === id);

            await deleteRecipeItem(db, id);

            recipes.splice(foundIndex, 1)

            setRecipes(recipes.slice(0));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadDataCallback();
    }, [loadDataCallback]);

    return (
        <View>
            {recipes.map((recipe) => (
                <RecipeItemComponent key={recipe.id} recipe={recipe} deleteItem={deleteItem} />
            ))}

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