import React from 'react';
import { connect } from 'react-redux';

import { ReduxState } from '@app/redux/reducers';
import { ArmedStatus as AlarmArmedStatus  } from '@app/redux/actions/armed';

import { PendingShieldBadge } from '@app/components/badges/PendingShieldBadge';
import { ShieldBadge } from '@app/components/badges/ShieldBadge';
import { SirenBadge } from '@app/components/badges/SirenBadge';

import './style.scss';

interface ArmedStatusProps {
  prevStatus?: AlarmArmedStatus
  armed?: AlarmArmedStatus
  countdown?: number
}

interface ArmedStatusState {}

class ArmedStatusComponent extends React.Component<ArmedStatusProps, ArmedStatusState> {

  state: ArmedStatusState = {};

  render() {
    const previouslyArmed = this.isSystemArmed(this.props.prevStatus);
    const isPending = this.props.armed === 'pending';
    const isTriggered = this.props.armed === 'triggered';
    const isArmed = this.isSystemArmed(this.props.armed);
    const showSiren = isTriggered || (isPending && previouslyArmed);
    return (
      <div className="ArmedStatus">
        {isPending && !previouslyArmed && (
          <PendingShieldBadge countdown={this.props.countdown}>
            Arming
          </PendingShieldBadge>
        )}
        {showSiren && (
          <SirenBadge countdown={this.props.countdown}>
            {isTriggered ? (
              <React.Fragment>Informing<br/>Police</React.Fragment>
            ) : (
              <React.Fragment>Please<br/>Disarm</React.Fragment>
            )}
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

  private isSystemArmed(status?: AlarmArmedStatus): boolean {
    return status === 'armed_away' || status === 'armed_home';
  }

}

const mapStateToProps = (state: ReduxState, ownProps: Partial<ArmedStatusProps>): Partial<ArmedStatusProps> => ({
  prevStatus: state.armed.prevStatus,
  armed: state.armed.status,
  countdown: state.armed.countdown || 0
});

export const ArmedStatus = connect(mapStateToProps)(ArmedStatusComponent);