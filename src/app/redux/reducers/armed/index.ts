import { ArmedStatus, ArmedActionTypes } from '@app/redux/actions/armed';

export interface ArmedState {
  status: ArmedStatus
  triggered: boolean
  pending: number | null
}

const initialState: ArmedState = {
  status: null,
  pending: null,
  triggered: false
};

export const armed = (state = initialState, action: ArmedActionTypes): ArmedState => {

  switch (action.type) {
    case 'ARMED_SET_STATUS':
      return {
        ...state,
        triggered: false,
        status: action.status
      };
    case 'ARMED_SET_PENDING':
      return {
        ...state,
        triggered: false,
        status: 'pending',
        pending: action.pending
      };
    case 'ARMED_SET_ALARM_TRIGGERED':
      return {
        ...state,
        triggered: true
      };
    default:
      return state;
  }

};
