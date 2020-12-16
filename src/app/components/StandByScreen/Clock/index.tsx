import React from 'react';

import { padZero } from '@app/utils/strings';

import './style.scss';

type ClockColorMode = 'dark' | 'light';

interface ClockProps {
  date: Date
  mode?: ClockColorMode
}

interface ClockState {
  interval?: number
  hours?: string
  mins?: string
  seconds?: string
}

class Clock extends React.Component<ClockProps, ClockState> {

  static defaultProps: ClockProps = {
    mode: 'light',
    date: new Date()
  };

  state: ClockState = {};

  componentDidMount() {
    this.calculateTimeParts(this.props.date);
  }

  componentDidUpdate(prevProps: ClockProps) {
    if (this.props.date !== prevProps?.date) {
      this.calculateTimeParts(this.props.date);
    }
  }

  render() {
    return (
      <div
        className={`Clock mode-${this.props.mode}`}
      >
        <span className="time-wrapper">
          <span className="hours">{this.state.hours}</span>
          <span className="mins">{this.state.mins}</span>
          <span className="seconds">{this.state.seconds}</span>
        </span>
      </div>
    );
  }

  private calculateTimeParts(now: Date): void {
    const hours = now.getHours();
    const mins = now.getMinutes();
    const seconds = now.getSeconds();
    this.setState({
      hours: padZero(hours),
      mins: padZero(mins),
      seconds: padZero(seconds)
    });
  }
}

export { Clock };
