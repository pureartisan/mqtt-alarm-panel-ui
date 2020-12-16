import { TimeActionTypes } from '@app/redux/actions/time';

export interface TimeState {
  now: Date
}

const initialState: TimeState = {
  now: new Date()
};

export const time = (state = initialState, action: TimeActionTypes): TimeState => {

  switch (action.type) {
    case 'TIME_SET_CURRENT_TIME':
      return {
        ...state,
        now: action.now
      };
    default:
      return state;
  }

};
