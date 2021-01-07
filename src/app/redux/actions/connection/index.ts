import { store } from '@app/redux/store';

export interface ConnectionSetStatusAction {
  type: 'CONNECTION_SET_STATUS',
  status: boolean
}

export type ConnectionActionTypes = ConnectionSetStatusAction;

// ACTIONS --------------

export const setConnectionStatus = (status: boolean) => store.dispatch({
  type: 'CONNECTION_SET_STATUS',
  status
} as ConnectionSetStatusAction);