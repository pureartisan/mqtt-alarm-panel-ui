import { StandByActionTypes } from '@app/redux/actions/stand-by';

export interface StandByState {
  active: boolean
}

const initialState: StandByState = {
  active: true
};

export const standBy = (state = initialState, action: StandByActionTypes): StandByState => {

  switch (action.type) {
    case 'STANDBY_ENABLE':
      return {
        ...state,
        active: true
      };
    case 'STANDBY_DISABLE':
      return {
        ...state,
        active: false
      };
    default:
      return state;
  }

};
