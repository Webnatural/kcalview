import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type RecipeData = {
    completed: boolean
    id: number
    title: string
    userId: number
}

export const recipeApiService = createApi({
    reducerPath: 'recipeApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
    endpoints: (builder) => ({
        // return RecipeData
        getRecipeList: builder.query<RecipeData, string>({
            query: (id) => `posts/${id}`,
        }),
    }),
})

export const { useGetRecipeListQuery } = recipeApiService