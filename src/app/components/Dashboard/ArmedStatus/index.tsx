import React from 'react';
import { connect } from 'react-redux';

import { ReduxState } from '@app/redux/reducers';

import { ShieldBadge } from '@app/components/badges/ShieldBadge';
import { SirenBadge } from '@app/components/badges/SirenBadge';

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
        <ShieldBadge>
          System<br/>Armed
        </ShieldBadge>
        <SirenBadge>
          Please<br/>Disarm
        </SirenBadge>
      </div>
    );
  }

}

const mapStateToProps = (state: ReduxState, ownProps: Partial<ArmedStatusProps>): Partial<ArmedStatusProps> => ({
  countdown: state.armed.pending || 0
});

export const ArmedStatus = connect(mapStateToProps)(ArmedStatusComponent);