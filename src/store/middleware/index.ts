import { Middleware } from 'redux';
import { RootState } from '@store';

export const loggerMiddlware: Middleware<
  {}, // Most middleware do not modify the dispatch return value
  RootState
> = store => nextDispatch => action => {
  let result = nextDispatch(action);
  return result;
};

export const testMiddlware: Middleware<
  {}, // Most middleware do not modify the dispatch return value
  RootState
> = store => nextDispatch => action => {
  let result = nextDispatch(action);
  return result;
};
