import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import { recipeApiService } from '@store/api';
import { loggerMiddlware, testMiddlware } from '@store/middleware';
import recipeReducer from '@slices/recipes';

const reducers = combineReducers({
    recipeReducer,
    [recipeApiService.reducerPath]: recipeApiService.reducer
})

const store = configureStore({
    reducer: reducers,
    middleware: (getCurrentMiddlewares) => {
        return getCurrentMiddlewares()
            .concat(loggerMiddlware)
            .concat(testMiddlware)
            .concat(recipeApiService.middleware)
    }
})

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;

export default store;