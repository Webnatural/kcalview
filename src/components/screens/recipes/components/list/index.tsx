import React, { useState } from 'react';
import { TouchableOpacity, View, Text, Alert, TextInput } from 'react-native';
import { List } from 'react-native-paper';
import uuid from 'react-uuid';

import { useAppSelector, useAppDispatch } from '@store/hooks';
import { addRecipe, removeRecipe, clearRecipes } from '@slices/recipes';
import { useGetRecipeListQuery } from '@store/api'


type recipeListItem = {
    id: string,
    title: string,
    time: string;
}

export default function RecipesList() {

    const recipeReducer = useAppSelector(state => state.recipeReducer);
    const recipeList = recipeReducer.recipeList;

    const [title, setTitle] = useState("")
    const [id, setId] = useState("")

    const dispatch = useAppDispatch()

    const { data, error, isLoading } = useGetRecipeListQuery('1')

    return (
        <>
            <Text>recipe LIST</Text>

            <TouchableOpacity onPress={() => {
                dispatch(clearRecipes())
            }}
            >
                <Text>Clear</Text>
            </TouchableOpacity>

            <List.Section>
                <List.Item title={title} />
            </List.Section>

            <TextInput value={title} style={[{ backgroundColor: 'white' }]} onChangeText={(title) => {
                setTitle(title)
                setId(uuid())
            }} />

            <TouchableOpacity onPress={() => {
                if (title === "") {
                    console.log("! no recipe");
                    return
                }
                dispatch(addRecipe({ title, id }))
                setTitle("")
            }}>
                <Text>Submit</Text>
            </TouchableOpacity>

            <List.Section>
                <List.Subheader>Some title</List.Subheader>

                {
                    recipeList.map((data) => {
                        return (
                            <TouchableOpacity key={data.id} onPress={() => {
                                { console.log(data) }
                                dispatch(removeRecipe(data))

                            }}>
                                <List.Item title={data.title} right={() => <List.Icon icon="close" />}></List.Item>
                            </TouchableOpacity>
                        )
                    })
                }
            </List.Section>

            {isLoading && <Text>Loading</Text>}
        </>
    );
};