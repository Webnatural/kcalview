import React from 'react';
import { List, IconButton } from 'react-native-paper';
import { Recipe } from '@screens/recipes/index.types'

type ItemProps = {
    recipe: Recipe,
    deleteItem: Function
}

export function RecipeItemComponent({ recipe: { id, title, description }, deleteItem }: ItemProps) {
    return (
        <List.Section>
            <List.Item title={title} description={description} />
            <IconButton
                icon="delete"
                onPress={() => deleteItem(id)}
                accessibilityLabel="Remove recipe item"
            />
        </List.Section>
    );
};