import React, { useState } from 'react';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import { TextRecognitionResult } from '@react-native-ml-kit/text-recognition';

import { View } from 'react-native';
import { Button, TextInput, Snackbar } from 'react-native-paper';

import { styles } from './index.styles';
import { getDBConnection, saveRecipeItems } from '@db/recipes';
import GoToButton from '@shared/components/GoToButton';

export default function FormAddItem({ text, blocks }: TextRecognitionResult) {
    const [showForm, setShowForm] = useState(true);
    const {
        register,
        control,
        getValues,
        formState: { },
    } = useForm({});

    const onSubmit = () => {
        addRecipe(getValues());
    };

    const addRecipe = async (values: FieldValues) => {
        if (!values.title.trim().length) {
            return;
        }

        const { title, description, ingredients } = values;
        const ingredientsJSON = JSON.stringify(ingredients || '@todo');

        try {
            const db = await getDBConnection();

            try {
                await saveRecipeItems(
                    db,
                    [{ id: 0, title, description, ingredients: ingredientsJSON }],
                    'recipes',
                );
            } catch (error) {
                console.error(error);
            }

            setShowForm(false);
        } catch (error) {
            console.error(error);
        }
    };

    return showForm ? (
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
                defaultValue={blocks[0].text}
                name={'title'}
            />

            <Controller
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        onChangeText={onChange}
                        value={value}
                        style={styles.input}
                        multiline
                        label="Description"
                        {...register('description')}
                        accessibilityLabel="Add Recipe Description"
                    />
                )}
                control={control}
                defaultValue={text}
                name={'description'}
            />
            <Button
                onPress={onSubmit}
                icon="receipt"
                mode="outlined"
                accessibilityLabel="Add Recipe">
                Add Recipe
            </Button>
        </View>
    ) : (
        <View style={styles.container}>
            <Snackbar visible={true} onDismiss={() => null}>
                Recipe has been added
            </Snackbar>
            <GoToButton style={styles.button} screenName="Recipes" icon="receipt" mode="contained" />
            <GoToButton style={styles.button} screenName="Home" icon="home" mode="outlined" />
        </View>
    );
}
