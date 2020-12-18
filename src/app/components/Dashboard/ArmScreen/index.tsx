import React from 'react';
import { connect } from 'react-redux';

import { ReduxState } from '@app/redux/reducers';

import { ArmOptions } from '../ArmOptions';
import { ArmingCountdown } from '../ArmingCountdown';

import './style.scss';

interface ArmScreenProps {
  armingCountdown?: number | null;
}

interface ArmScreenState {}

class ArmScreenComponent extends React.Component<ArmScreenProps, ArmScreenState> {

  state: ArmScreenState = {};

  render() {
    return (
      <div className="ArmScreen">
        {this.props.armingCountdown ? (
          <ArmingCountdown />
        ) : (
          <ArmOptions />
        )}
      </div>
    );
  }

}

const mapStateToProps = (state: ReduxState, ownProps: Partial<ArmScreenProps>): Partial<ArmScreenProps> => ({
  armingCountdown: state.armed.pending
});

export const ArmScreen = connect(mapStateToProps)(ArmScreenComponent);
