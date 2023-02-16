import React, { useState } from 'react';
import {
    useForm,
    Controller,
    FieldValues,
} from 'react-hook-form';

import { Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { styles } from './index.styles';
import { getDBConnection, saveRecipeItems } from '@db/recipes';
import GoToButton from '@shared/components/GoToButton';

type FormAddItemProps = {
    text: string;
};

export default function FormAddItem({ text }: FormAddItemProps) {
    const [showForm, setShowForm] = useState(true);
    const {
        register,
        control,
        getValues,
        formState: { errors },
    } = useForm({});

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
            } catch (error) {
                console.error(error);
            }

            setShowForm(false)
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
                name={'title'}
            />

            <Controller
                render={({ field: { onChange } }) => (
                    <TextInput
                        onChangeText={onChange}
                        value={text}
                        style={styles.input}
                        multiline
                        label="Description"
                        {...register('description')}
                        accessibilityLabel="Add Recipe Description"
                    />
                )}
                control={control}
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
        <View>
            <Text>Recipe has been added</Text>
            <GoToButton
                screenName='Recipes'
                icon="receipt"
                mode="contained" />
            <GoToButton
                screenName='Home'
                icon="home"
                mode="outlined" />
        </View>
    );
}
