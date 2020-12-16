import { store } from '@app/redux/store';

export interface StandByEnableAction {
  type: 'STANDBY_ENABLE'
}

export interface StandByDisableAction {
  type: 'STANDBY_DISABLE'
}

export type StandByActionTypes = StandByEnableAction | StandByDisableAction;

// ACTIONS --------------

export const enableStandBy = () => store.dispatch({
  type: 'STANDBY_ENABLE'
} as StandByEnableAction);

export const disableStandBy = () => store.dispatch({
  type: 'STANDBY_DISABLE'
} as StandByDisableAction);