import React from 'react';
import { connect } from 'react-redux';

import { ReduxState } from '@app/redux/reducers';
import { ArmedStatus as AlarmArmedStatus  } from '@app/redux/actions/armed';

import { PendingShieldBadge } from '@app/components/badges/PendingShieldBadge';
import { ShieldBadge } from '@app/components/badges/ShieldBadge';
import { SirenBadge } from '@app/components/badges/SirenBadge';

import './style.scss';

interface ArmedStatusProps {
  armed?: AlarmArmedStatus
  countdown?: number
}

interface ArmedStatusState {}

class ArmedStatusComponent extends React.Component<ArmedStatusProps, ArmedStatusState> {

  state: ArmedStatusState = {};

  render() {
    const isPending = this.props.armed === 'pending';
    const isTriggered = this.props.armed === 'triggered';
    const isArmed = !isPending && !isTriggered;
    return (
      <div className="ArmedStatus">
        {isPending && (
          <PendingShieldBadge countdown={this.props.countdown}>
            Arming...
          </PendingShieldBadge>
        )}
        {isTriggered && (
          <SirenBadge>
            Please<br/>Disarm
          </SirenBadge>
        )}
        {isArmed && (
          <ShieldBadge>
            System<br/>Armed
          </ShieldBadge>
        )}
      </div>
    );
  }

}

const mapStateToProps = (state: ReduxState, ownProps: Partial<ArmedStatusProps>): Partial<ArmedStatusProps> => ({
  armed: state.armed.status,
  countdown: state.armed.countdown || 0
});

export const ArmedStatus = connect(mapStateToProps)(ArmedStatusComponent);