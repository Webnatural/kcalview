import React, { useCallback, useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navstack/root/index.types';

import { RecipeItems } from '@screens/recipes/components/Item';
import FormAddItem from '@screens/recipes/components/FormAddItem';
import { Recipe } from '@screens/recipes/index.types';
import { getDBConnection, getRecipeItems, deleteRecipeItem } from '@db/recipes';


export default function RecipesScreen() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const tableName = 'recipes';

  const deleteItem = async (id: number) => {
    try {
      const db = await getDBConnection();
      await deleteRecipeItem(db, id, tableName);
      setRecipes(prevRecipes => prevRecipes.filter(r => r.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const loadData = useCallback(async () => {
    try {
      const db = await getDBConnection();
      const storedRecipeItems = await getRecipeItems(db, tableName);

      if (storedRecipeItems.length) {
        setRecipes(storedRecipeItems);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <View>
      <ScrollView>
        {recipes.map(recipe => (
          <RecipeItems
            key={recipe.id}
            recipe={recipe}
            deleteItem={deleteItem}
          />
        ))}
        <FormAddItem recipes={recipes} setRecipes={setRecipes} />
      </ScrollView>
    </View>
  );
}
