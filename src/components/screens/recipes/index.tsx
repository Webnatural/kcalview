import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navstack/root/index.types';

import { RecipeItemComponent } from '@screens/recipes/components/Item';
import FormAddItem from '@screens/recipes/components/FormAddItem';
import { Recipe } from '@screens/recipes/index.types';
import { getDBConnection, getRecipeItems, createTable, deleteRecipeItem } from '@db';

type RecipesProps = NativeStackScreenProps<RootStackParamList, 'Recipes'>;

export default function RecipesScreen({ navigation }: RecipesProps) {

    const [recipes, setRecipes] = useState<Recipe[]>([]);

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
            <FormAddItem recipes={recipes} setRecipes={setRecipes} />
        </View>
    );
};