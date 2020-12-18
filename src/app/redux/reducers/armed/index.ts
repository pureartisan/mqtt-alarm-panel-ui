import { ArmedStatus, ArmedActionTypes } from '@app/redux/actions/armed';

export interface ArmedState {
  prevStatus: ArmedStatus
  status: ArmedStatus
  countdown: number | null
}

const initialState: ArmedState = {
  prevStatus: null,
  status: null,
  countdown: null
};

const getPrevStatus = (state: ArmedState, newStatus: ArmedStatus): ArmedStatus => {
  return state.status === newStatus ? state.prevStatus : state.status;
};

export const armed = (state: ArmedState = initialState, action: ArmedActionTypes): ArmedState => {

  switch (action.type) {
    case 'ARMED_SET_STATUS':
      return {
        ...state,
        prevStatus: getPrevStatus(state, action.status),
        status: action.status,
        countdown: null
      };
    case 'ARMED_SET_PENDING':
      return {
        ...state,
        prevStatus: getPrevStatus(state, 'pending'),
        status: 'pending',
        countdown: action.countdown
      };
    case 'ARMED_SET_ALARM_TRIGGERED':
      return {
        ...state,
        prevStatus: getPrevStatus(state, 'pending'),
        status: 'pending',
        countdown: action.countdown
      };
    default:
      return state;
  }

};
