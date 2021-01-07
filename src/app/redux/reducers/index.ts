import { combineReducers } from 'redux';

import { time } from './time';
import { standBy } from './stand-by';
import { armed } from './armed';
import { connection } from './connection';

export const rootReducer = combineReducers({
  time,
  standBy,
  armed,
  connection
});

export type ReduxState = ReturnType<typeof rootReducer>;
