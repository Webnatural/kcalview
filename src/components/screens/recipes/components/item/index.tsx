import React from 'react';
import { List, IconButton } from 'react-native-paper';
import { Recipe } from '@screens/recipes/index.types'

type ItemProps = {
    recipe: Recipe,
    deleteItem: (value: number) => void;
}

export function RecipeItems({ recipe: { id = 0, title, description }, deleteItem }: ItemProps) {
    return (
        <List.Section>
            <List.Item key={id} title={title} description={description} />
            <IconButton
                icon="delete"
                onPress={() => deleteItem(id)}
                accessibilityLabel="Remove recipe item"
            />
        </List.Section>
    );
};