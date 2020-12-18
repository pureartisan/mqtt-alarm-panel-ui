import React from 'react';
import { connect } from 'react-redux';

import { ReduxState } from '@app/redux/reducers';
import { padZero } from '@app/utils/strings';

import { ShieldIcon } from '@app/components/icons/ShieldIcon';

import './style.scss';

interface PendingShieldBadgeProps {
  now?: Date
  countdown?: number
  children?: React.ReactNode | React.ReactNode[]
}

interface PendingShieldBadgeState {
  countdownEndAt?: number
  timeLeft?: number
  mins?: string
  seconds?: string
}

export class PendingShieldBadgeComponent extends React.Component<PendingShieldBadgeProps, PendingShieldBadgeState> {

  state: PendingShieldBadgeState = {
    countdownEndAt: 0,
    mins: '',
    seconds: ''
  };

  componentDidMount() {
    this.calcualteCountDownEndAt();
  }

  componentWillUpdate(prevProps: PendingShieldBadgeProps, prevState: PendingShieldBadgeState) {
    if (this.props.countdown !== prevProps.countdown) {
      this.calcualteCountDownEndAt();
    }
    if (this.props.now !== prevProps.now || this.state.countdownEndAt !== prevState.countdownEndAt) {
      this.calculateTimeLeft();
    }
  }

  render() {
    return (
      <div className="PendingShieldBadge">
        <div className="label">
          { this.props.children }
        </div>
        <div className="ring">
          <ShieldIcon
            fill1={'var(--color-warning)'}
            fill2={'white'}
            fill3={'var(--color-warning)'}
          />
        </div>
        <div className="time-left">
          {this.state.timeLeft ? (
            <span>{`${this.state.mins}:${this.state.seconds}`}</span>
          ) : (
            <span>.....</span>
          )}
        </div>
      </div>
    );
  }

  private calcualteCountDownEndAt(): void {
    const diffSeconds = this.props.countdown || 0;
    this.setState({
      countdownEndAt: new Date().getTime() + (diffSeconds * 1000)
    });
  }

  private calculateTimeLeft(): void {
    if (!this.state.countdownEndAt || !this.props.now) {
      this.setState({
        mins: '00',
        seconds: '00'
      });
      return;
    }

    const diff = this.state.countdownEndAt - this.props.now.getTime();
    const diffSeconds = Math.floor(diff / 1000);
    const mins = Math.floor(diffSeconds / 60);
    const seconds = diffSeconds % 60;

    this.setState({
      timeLeft: diffSeconds,
      mins: padZero(mins),
      seconds: padZero(seconds)
    });
  }

}

const mapStateToProps = (state: ReduxState, ownProps: Partial<PendingShieldBadgeProps>): Partial<PendingShieldBadgeProps> => ({
  now: state.time.now
});

export const PendingShieldBadge = connect(mapStateToProps)(PendingShieldBadgeComponent);