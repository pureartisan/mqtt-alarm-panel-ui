import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

import { ReduxState } from '@app/redux/reducers';

import { Keypad } from '../Keypad';
import { ArmedStatus } from '../ArmedStatus';

import './style.scss';

interface DisarmScreenProps {}

interface DisarmScreenState {
  value?: string
}

class DisarmScreenComponent extends React.Component<DisarmScreenProps, DisarmScreenState> {

  state: DisarmScreenState = {
    value: ''
  };

  render() {
    return (
      <div className="DisarmScreen">
        <Keypad />
        <div className="info">
          <ArmedStatus />
        </div>
      </div>
    );
  }

}

// const mapStateToProps = (state: ReduxState, ownProps: Partial<DisarmScreenProps>): Partial<DisarmScreenProps> => ({
//   c: state.armed.pending
// });

// export const DisarmScreen = connect(mapStateToProps)(DisarmScreenComponent);

export { DisarmScreenComponent as DisarmScreen };