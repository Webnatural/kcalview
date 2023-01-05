import { Middleware } from 'redux';
import { RootState } from '@store';

export const loggerMiddlware: Middleware<
    {}, // Most middleware do not modify the dispatch return value
    RootState
> = store => nextDispatch => action => {
    console.log('dispatching', action)
    let result = nextDispatch(action)
    console.log('next state', store.getState())
    return result
};

export const testMiddlware: Middleware<
    {}, // Most middleware do not modify the dispatch return value
    RootState
> = store => nextDispatch => action => {
    console.log('dispatching test')
    let result = nextDispatch(action)
    console.log('after dispatching test')
    return result
};