import { createSlice } from '@reduxjs/toolkit'

interface InitialState {
    recipeList: Array<string>
};

const initialState: InitialState = {
    recipeList: []
};

export const recipeSlice = createSlice({
    name: 'recipe',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        addRecipe: (state, action) => {
            state.recipeList.push(action.payload)
        },
        addTimestamp: (state) => {
            state.recipeList.push(Date.now().toString())
        }
    }
});

export const { addRecipe, addTimestamp } = recipeSlice.actions;

export default recipeSlice.reducer;