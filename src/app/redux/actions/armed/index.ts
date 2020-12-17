import { store } from '@app/redux/store';

export type ArmedStatus = null | 'arm_home' | 'arm_away' | 'arm_night';

export interface ArmedSetStatusAction {
  type: 'ARMED_SET_STATUS',
  status: ArmedStatus
}

export interface ArmedSetPendingAction {
  type: 'ARMED_SET_PENDING',
  pending: boolean
}

export interface ArmedSetArmingCountdownAction {
  type: 'ARMED_SET_ARMING_COUNTDOWN',
  countdown: number | null
}

export type ArmedActionTypes = ArmedSetStatusAction | ArmedSetPendingAction | ArmedSetArmingCountdownAction;

// ACTIONS --------------

export const setArmedStatus = (status: ArmedStatus) => store.dispatch({
  type: 'ARMED_SET_STATUS',
  status
} as ArmedSetStatusAction);

export const setArmedPending = (pending: boolean) => store.dispatch({
  type: 'ARMED_SET_PENDING',
  pending
} as ArmedSetPendingAction);

export const setArmingCountdown = (countdown: number | null) => store.dispatch({
  type: 'ARMED_SET_ARMING_COUNTDOWN',
  countdown
} as ArmedSetArmingCountdownAction);