import React from 'react';
import { connect } from 'react-redux';

import { ReduxState } from '@app/redux/reducers';

import { padZero } from '@app/utils/strings';

import './style.scss';

interface DateTimeProps {
  now?: Date
}

interface DateTimeState {
  year?: string
  month?: string
  date?: string
  hours?: string
  mins?: string
  seconds?: string
}

class DateTimeComponent extends React.Component<DateTimeProps, DateTimeState> {

  state: DateTimeState = {};

  componentDidMount() {
    this.calculateDateTime(this.props.now);
  }

  componentDidUpdate(prevProps: DateTimeProps) {
    if (this.props.now !== prevProps?.now) {
      this.calculateDateTime(this.props.now);
    }
  }

  render() {
    return (
      <div className="DateTime">
        <div className="date">
          { `${this.state.date}.${this.state.month}.${this.state.year}` }
        </div>
        <div className="time">
          { `${this.state.hours}:${this.state.mins}:${this.state.seconds}` }
        </div>
      </div>
    );
  }

  private calculateDateTime(now: Date = new Date()): void {
    const year = `${now.getFullYear()}`;
    const date = now.getDate();
    const month = now.getMonth() + 1; // zero based
    const hours = now.getHours();
    const mins = now.getMinutes();
    const seconds = now.getSeconds();
    this.setState({
      year,
      date: padZero(date),
      month: padZero(month),
      hours: padZero(hours),
      mins: padZero(mins),
      seconds: padZero(seconds),
    });
  }

}

const mapStateToProps = (state: ReduxState, ownProps: Partial<DateTimeProps>): Partial<DateTimeProps> => ({
  now: state.time.now
});

export const DateTime = connect(mapStateToProps)(DateTimeComponent);
