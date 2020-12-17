import { ArmedStatus, ArmedActionTypes } from '@app/redux/actions/armed';

export interface ArmedState {
  status: ArmedStatus
  pending: boolean
  countdown: number | null
}

const initialState: ArmedState = {
  status: null,
  pending: false,
  countdown: null
};

export const armed = (state = initialState, action: ArmedActionTypes): ArmedState => {

  switch (action.type) {
    case 'ARMED_SET_STATUS':
      return {
        ...state,
        status: action.status
      };
    case 'ARMED_SET_PENDING':
      return {
        ...state,
        pending: action.pending
      };
    case 'ARMED_SET_ARMING_COUNTDOWN':
      return {
        ...state,
        countdown: action.countdown
      };
    default:
      return state;
  }

};
