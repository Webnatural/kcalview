import React from 'react';
import {
  useForm,
  useFieldArray,
  Controller,
  FieldValues,
} from 'react-hook-form';

import { Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { Recipe } from '@screens/recipes/index.types';
import { styles } from './index.styles';
import { getDBConnection, saveRecipeItems } from '@db/recipes';

type FormAddItemProps = {
  recipes: Recipe[];
  setRecipes: (value: Recipe[]) => void;
};

export default function FormAddItem({ recipes, setRecipes }: FormAddItemProps) {
  const {
    register,
    control,
    getValues,
    reset,
    formState: { errors },
  } = useForm({});
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  });

  const onSubmit = () => {
    addRecipe(getValues());
  };

  const addRecipe = async (values: FieldValues) => {
    if (!values.title.trim().length) {
      return;
    }

    const { title, description, ingredients } = values;
    const ingredientsJSON = JSON.stringify(ingredients);

    try {
      const db = await getDBConnection();

      try {
        const id = await saveRecipeItems(
          db,
          [{ id: 0, title, description, ingredients: ingredientsJSON }],
          'recipes',
        );
        setRecipes([...recipes, { id, title, description, ingredients }]);
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Controller
        render={({ field: { onChange, value } }) => (
          <TextInput
            onChangeText={onChange}
            value={value}
            label="Title"
            style={styles.input}
            {...register('title', { required: true })}
            accessibilityLabel="Add Recipe Title"
          />
        )}
        control={control}
        name={'title'}
      />

      <Controller
        render={({ field: { onChange, value } }) => (
          <TextInput
            onChangeText={onChange}
            value={value}
            style={styles.input}
            multiline
            numberOfLines={4}
            label="Description"
            {...register('description')}
            accessibilityLabel="Add Recipe Description"
          />
        )}
        control={control}
        name={'description'}
      />

      {fields.map((item, index) => {
        return (
          <View key={item.id} style={styles.inlineInputContainer}>
            <Controller
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  onChangeText={onChange}
                  value={value}
                  label="Ingredient"
                  {...register(`ingredients.${index}.ingredientName`, {
                    required: true,
                  })}
                />
              )}
              control={control}
              name={`ingredients.${index}.ingredientName`}
            />

            <Controller
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[
                    styles.input,
                    styles.flex1,
                    styles.massInputWidth,
                    styles.textAlignRight,
                  ]}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="numeric"
                  maxLength={4}
                />
              )}
              name={`ingredients.${index}.mass`}
              control={control}
            />
            <Text>g</Text>

            <Button icon="minus" mode="outlined" onPress={() => remove(index)}>
              Delete
            </Button>
          </View>
        );
      })}
      <View>
        <Button
          icon="plus"
          mode="outlined"
          style={[styles.button, styles.alignSelfEnd]}
          onPress={() => {
            append({ ingredientName: '', mass: 0 });
          }}>
          Add ingredient
        </Button>
      </View>
      <Button
        onPress={onSubmit}
        icon="receipt"
        mode="contained"
        accessibilityLabel="Add Recipe">
        Add Recipe
      </Button>
      <View style={styles.button}>
        <Button
          icon="close"
          mode="outlined"
          onPress={() => {
            reset({
              ingredientName: 'Hempseed',
              mass: 0,
            });
          }}>
          Reset
        </Button>
      </View>
    </View>
  );
}
