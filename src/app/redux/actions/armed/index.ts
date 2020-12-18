import { store } from '@app/redux/store';

export type ArmedStatus = null | 'armed_home' | 'armed_away' | 'pending';

export interface ArmedSetStatusAction {
  type: 'ARMED_SET_STATUS',
  status: ArmedStatus
}

export interface ArmedSetPendingAction {
  type: 'ARMED_SET_PENDING',
  pending: number | null
}

export interface ArmedSetAlarmTriggeredAction {
  type: 'ARMED_SET_ALARM_TRIGGERED'
}

export type ArmedActionTypes = ArmedSetStatusAction | ArmedSetPendingAction | ArmedSetAlarmTriggeredAction;

// ACTIONS --------------

export const setArmedStatus = (status: ArmedStatus) => store.dispatch({
  type: 'ARMED_SET_STATUS',
  status
} as ArmedSetStatusAction);

export const setArmedPending = (pending: number) => store.dispatch({
  type: 'ARMED_SET_PENDING',
  pending
} as ArmedSetPendingAction);

export const setAlarmTriggered = () => store.dispatch({
  type: 'ARMED_SET_ALARM_TRIGGERED'
} as ArmedSetAlarmTriggeredAction);