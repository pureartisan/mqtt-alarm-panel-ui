import React from 'react';

import { Date as DateComp } from '../Date';
import { Clock } from '../Clock';

import './style.scss';

type ClockColorMode = 'dark' | 'light';

interface MainClockProps {
  mode?: ClockColorMode
}

interface MainClockState {
  interval?: number
  date?: Date
}

class MainClock extends React.Component<MainClockProps, MainClockState> {

  static defaultProps: MainClockProps = {
    mode: 'light'
  };

  state: MainClockState = {};

  componentDidMount() {
    this.startClock();
  }

  componentWillMount() {
    this.stopClock();
  }

  render() {
    return (
      <div className={`MainClock mode-${this.props.mode}`}>
        <DateComp date={this.state.date} />
        <Clock date={this.state.date} />
      </div>
    );
  }

  private startClock(): void {
    const interval = window.setInterval(() => {
      const date = new Date();
      this.setState({ date });
    }, 1000);

    this.setState({
      interval
    });
  }

  private stopClock(): void {
    if (this.state.interval) {
      clearInterval(this.state.interval);
    }
  }
}

export { MainClock };
