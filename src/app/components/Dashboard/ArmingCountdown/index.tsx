import React from 'react';
import { connect } from 'react-redux';

import { ReduxState } from '@app/redux/reducers';

import './style.scss';

interface ArmingCountdownProps {
  countdown?: number
}

interface ArmingCountdownState {}

class ArmingCountdownComponent extends React.Component<ArmingCountdownProps, ArmingCountdownState> {

  state: ArmingCountdownState = {};

  render() {
    return (
      <div className="ArmingCountdown">
        { this.props.countdown }
      </div>
    );
  }

}

const mapStateToProps = (state: ReduxState, ownProps: Partial<ArmingCountdownProps>): Partial<ArmingCountdownProps> => ({
  countdown: state.armed.countdown || 0
});

export const ArmingCountdown = connect(mapStateToProps)(ArmingCountdownComponent);