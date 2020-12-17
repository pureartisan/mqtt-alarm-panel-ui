import React from 'react';
import { connect } from 'react-redux';

import { ReduxState } from '@app/redux/reducers';

import { ShieldBadge } from '@app/components/badges/ShieldBadge';

import './style.scss';

interface ArmedStatusProps {
  countdown?: number
}

interface ArmedStatusState {}

class ArmedStatusComponent extends React.Component<ArmedStatusProps, ArmedStatusState> {

  state: ArmedStatusState = {};

  render() {
    return (
      <div className="ArmedStatus">
        <div className="armed">
          <div className="label">System<br/>Armed</div>
          <ShieldBadge />
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state: ReduxState, ownProps: Partial<ArmedStatusProps>): Partial<ArmedStatusProps> => ({
  countdown: state.armed.countdown || 0
});

export const ArmedStatus = connect(mapStateToProps)(ArmedStatusComponent);