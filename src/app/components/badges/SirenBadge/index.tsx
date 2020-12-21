import React from 'react';
import { connect } from 'react-redux';

import { ReduxState } from '@app/redux/reducers';
import { ArmedStatus } from '@app/redux/actions/armed';
import { padZero } from '@app/utils/strings';
import { AudioService } from '@app/services/audio';

import { SirenIcon } from '@app/components/icons/SirenIcon';

import './style.scss';

const BEEP_INTERVAL = 10; // should be an integer

interface SirenBadgeProps {
  armed?: ArmedStatus
  now?: Date
  countdown?: number
  children?: React.ReactNode | React.ReactNode[]
}

interface SirenBadgeState {
  countdownEndAt?: number
  timeLeft?: number
  mins?: string
  seconds?: string
}

interface TimeLeftProps {
  timeLeft?: boolean
  mins?: string,
  seconds?: string
}

const TimeLeft = ({ timeLeft, mins, seconds }: TimeLeftProps) => (
  <React.Fragment>
    {timeLeft ? (
      <span>{`${mins}:${seconds}`}</span>
    ) : (
      <span>.....</span>
    )}
  </React.Fragment>
)

export class SirenBadgeComponent extends React.Component<SirenBadgeProps, SirenBadgeState> {

  state: SirenBadgeState = {
    countdownEndAt: 0,
    mins: '',
    seconds: ''
  };

  componentDidMount() {
    this.calcualteCountDownEndAt();
  }

  componentWillUpdate(prevProps: SirenBadgeProps, prevState: SirenBadgeState) {
    if (this.props.countdown !== prevProps.countdown) {
      this.calcualteCountDownEndAt();
    }
    if (this.props.now !== prevProps.now || this.state.countdownEndAt !== prevState.countdownEndAt) {
      this.calculateTimeLeft();
      this.handleBeeping();
    }
  }

  render() {
    const isTriggered = this.props.armed === 'triggered';
    return (
      <div className="SirenBadge">
        <div className="label">
          { this.props.children }
        </div>
        <div className="ring">
          <SirenIcon animation={isTriggered ? 'tremble' : 'breath'} />
        </div>
        <div className="time-left">
          {isTriggered ? (
            <span>-----</span>
          ) : (
            <TimeLeft
              timeLeft={Boolean(this.state.timeLeft)}
              mins={this.state.mins}
              seconds={this.state.seconds}
            />
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

  private handleBeeping(): void {
    if (this.props.armed === 'pending' && this.state.timeLeft && this.state.timeLeft % BEEP_INTERVAL === 0) {
      AudioService.play('beep');
    }
  }

}

const mapStateToProps = (state: ReduxState, ownProps: Partial<SirenBadgeProps>): Partial<SirenBadgeProps> => ({
  now: state.time.now,
  armed: state.armed.status
});

export const SirenBadge = connect(mapStateToProps)(SirenBadgeComponent);