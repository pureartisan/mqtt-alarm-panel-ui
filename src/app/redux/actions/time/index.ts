import { store } from '@app/redux/store';

export interface TimeSetCurrentTimeAction {
  type: 'TIME_SET_CURRENT_TIME',
  now: Date
}

export type TimeActionTypes = TimeSetCurrentTimeAction;

// ACTIONS --------------

export const setCurrentTime = (now: Date) => store.dispatch({
  type: 'TIME_SET_CURRENT_TIME',
  now
} as TimeSetCurrentTimeAction);