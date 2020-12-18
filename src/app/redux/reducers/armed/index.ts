import { ArmedStatus, ArmedActionTypes } from '@app/redux/actions/armed';

export interface ArmedState {
  status: ArmedStatus
  countdown: number | null
}

const initialState: ArmedState = {
  status: null,
  countdown: null
};

export const armed = (state = initialState, action: ArmedActionTypes): ArmedState => {

  switch (action.type) {
    case 'ARMED_SET_STATUS':
      return {
        ...state,
        status: action.status,
        countdown: null
      };
    case 'ARMED_SET_PENDING':
      return {
        ...state,
        status: 'pending',
        countdown: action.countdown
      };
    case 'ARMED_SET_ALARM_TRIGGERED':
      return {
        ...state,
        status: 'pending',
        countdown: action.countdown
      };
    default:
      return state;
  }

};
