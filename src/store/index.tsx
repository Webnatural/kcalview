import { configureStore } from '@reduxjs/toolkit'
import recipeReducer from './slices/recipes'
import { loggerMiddlware, testMiddlware } from './middleware'
import { combineReducers } from 'redux'
import { recipeApiService } from './api'

const reducers = combineReducers({
    recipeReducer,
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