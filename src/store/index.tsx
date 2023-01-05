import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import { recipeApiService } from './api';
import { loggerMiddlware, testMiddlware } from './middleware';
import recipeSlice from './slices/recipes';

const reducers = combineReducers({
    recipeSlice,
    [recipeApiService.reducerPath]: recipeApiService.reducer
})

const store = configureStore({
    reducer: reducers,
    middleware: (getCurrentMiddlewares) => {
        return getCurrentMiddlewares()
            .concat(loggerMiddlware)
        // .concat(testMiddlware)
        // .concat(recipeApiService.middleware)
    }
})

export type RootState = ReturnType<typeof reducers>
export type AppDispatch = typeof store.dispatch

export default store