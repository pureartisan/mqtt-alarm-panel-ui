import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

import { ReduxState } from '@app/redux/reducers';

import './style.scss';

interface ArmScreenProps {
  armed?: boolean;
}

interface ArmScreenState {
  value?: string
}

class ArmScreenComponent extends React.Component<ArmScreenProps, ArmScreenState> {

  state: ArmScreenState = {
    value: ''
  };

  render() {
    return (
      <div className="ArmScreen">
        // System is disarmed
      </div>
    );
  }

}

const mapStateToProps = (state: ReduxState, ownProps: Partial<ArmScreenProps>): Partial<ArmScreenProps> => ({
  armed: false // TODO get from stage
});

export const ArmScreen = connect(mapStateToProps)(ArmScreenComponent);
