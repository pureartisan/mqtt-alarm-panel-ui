import { combineReducers } from 'redux';

import { time } from './time';
import { standBy } from './stand-by';
import { armed } from './armed';

export const rootReducer = combineReducers({
  time,
  standBy,
  armed
});

export type ReduxState = ReturnType<typeof rootReducer>;
