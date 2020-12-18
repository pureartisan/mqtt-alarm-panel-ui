import { store } from '@app/redux/store';

export type ArmedStatus = null | 'armed_home' | 'armed_away' | 'pending' | 'triggered';

export interface ArmedSetStatusAction {
  type: 'ARMED_SET_STATUS',
  status: ArmedStatus
}

export interface ArmedSetPendingAction {
  type: 'ARMED_SET_PENDING',
  countdown: number | null
}

export interface ArmedSetAlarmTriggeredAction {
  type: 'ARMED_SET_ALARM_TRIGGERED',
  countdown: number | null
}

export type ArmedActionTypes = ArmedSetStatusAction | ArmedSetPendingAction | ArmedSetAlarmTriggeredAction;

// ACTIONS --------------

export const setArmedStatus = (status: ArmedStatus) => store.dispatch({
  type: 'ARMED_SET_STATUS',
  status
} as ArmedSetStatusAction);

export const setArmedPending = (countdown: number) => store.dispatch({
  type: 'ARMED_SET_PENDING',
  countdown
} as ArmedSetPendingAction);

export const setAlarmTriggered = (countdown: number) => store.dispatch({
  type: 'ARMED_SET_ALARM_TRIGGERED',
  countdown
} as ArmedSetAlarmTriggeredAction);
