import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Recipe = {
  id: string;
  title: string;
  time: string;
};

type RecipesInitialState = {
  items: Recipe[];
};

const initialState: RecipesInitialState = {
  items: [],
};

export const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    clearRecipes: state => {
      state.items = [];
    },
    addRecipe: (state, action: PayloadAction<Recipe>) => {
      state.items.push(action.payload);
      // state.items = [...state.items, action.payload];
    },
    removeRecipe: (state, action: PayloadAction<{ id: string }>) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
  },
});

export const { addRecipe, removeRecipe, clearRecipes } = recipesSlice.actions;

export const { reducer: recipeReducer } = recipesSlice;
