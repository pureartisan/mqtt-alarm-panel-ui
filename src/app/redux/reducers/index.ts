import { combineReducers } from 'redux';

import { time } from './time';
import { standBy } from './stand-by';

export const rootReducer = combineReducers({
  time,
  standBy
});

export type ReduxState = ReturnType<typeof rootReducer>;
