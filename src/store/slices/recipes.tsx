import { createSlice } from '@reduxjs/toolkit'

type recipeList = recipeListItem[]

type recipeListItem = {
    id: string,
    title: string,
    time: string;
}

interface InitialState {
    recipeList: recipeList
};

const initialState: InitialState = {
    recipeList: []
};

export const recipeReducer = createSlice({
    name: 'recipe',
    initialState,
    reducers: {
        clearRecipes: (state) => {
            state.recipeList = []
        },
        addRecipe: (state, action) => {
            state.recipeList.push(action.payload)
        },
        removeRecipe: (state, action) => {
            return {
                ...state,
                recipeList: state.recipeList.filter(
                    item => item.id !== action.payload.id
                )
            };
        },
    }
});

export const { addRecipe, removeRecipe, clearRecipes } = recipeReducer.actions;

export default recipeReducer.reducer;