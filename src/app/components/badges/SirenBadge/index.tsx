import React from 'react';
import { connect } from 'react-redux';

import { ReduxState } from '@app/redux/reducers';
import { padZero } from '@app/utils/strings';

import { SirenIcon } from '@app/components/icons/SirenIcon';

import './style.scss';

interface SirenBadgeProps {
  now?: Date
  countdown?: number
  triggered?: boolean
  children?: React.ReactNode | React.ReactNode[]
}

interface SirenBadgeState {
  countdownEndAt?: number
  timeLeft?: number
  mins?: string
  seconds?: string
}

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
    }
  }

  render() {
    return (
      <div className="SirenBadge">
        <div className="label">
          { this.props.children }
        </div>
        <div className="ring">
          <SirenIcon animation={this.props.triggered ? 'tremble' : 'breath'} />
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
    const diff = (this.props.countdown || 0) * 1000;
    this.setState({
      countdownEndAt: new Date().getTime() + diff
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

const mapStateToProps = (state: ReduxState, ownProps: Partial<SirenBadgeProps>): Partial<SirenBadgeProps> => ({
  now: state.time.now,
  triggered: state.armed.status === 'triggered'
});

export const SirenBadge = connect(mapStateToProps)(SirenBadgeComponent);