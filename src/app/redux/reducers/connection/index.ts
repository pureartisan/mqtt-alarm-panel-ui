import { ConnectionActionTypes } from '@app/redux/actions/connection';

export interface ConnectionState {
  status: boolean
}

const initialState: ConnectionState = {
  status: false
};

export const connection = (state = initialState, action: ConnectionActionTypes): ConnectionState => {

  switch (action.type) {
    case 'CONNECTION_SET_STATUS':
      return {
        ...state,
        status: action.status
      };
    default:
      return state;
  }

};
