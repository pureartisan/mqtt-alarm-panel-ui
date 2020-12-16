import React from 'react';

import './style.scss';

type ClockColorMode = 'dark' | 'light';

interface DateProps {
  date: Date
  mode?: ClockColorMode
}

interface DateState {
  day?: string
  month?: string
  date?: string
}

interface NameMap {
  [index: string]: string
}

class DateComponent extends React.Component<DateProps, DateState> {

  static defaultProps: DateProps = {
    mode: 'light',
    date: new Date()
  };

  private static DAY_NAMES: NameMap = {
    '0': 'Sun',
    '1': 'Mon',
    '2': 'Tue',
    '3': 'Wed',
    '4': 'Thu',
    '5': 'Fri',
    '6': 'Sat'
  };

  private static MONTH_NAMES: NameMap = {
    '0': 'January',
    '1': 'February',
    '2': 'March',
    '3': 'April',
    '4': 'May',
    '5': 'June',
    '6': 'July',
    '7': 'August',
    '8': 'September',
    '9': 'October',
    '10': 'November',
    '11': 'December',
  };

  state: DateState = {};

  componentDidMount() {
    this.calculateDateParts(this.props.date);
  }

  componentDidUpdate(prevProps: DateProps) {
    if (this.props.date !== prevProps?.date) {
      this.calculateDateParts(this.props.date);
    }
  }

  render() {
    return (
      <div
        className={`Date mode-${this.props.mode}`}
      >
        <span className="day">{this.state.day}</span>
        <span className="date">{this.state.date}</span>
        <span className="month">{this.state.month}</span>
      </div>
    );
  }

  private calculateDateParts(today: Date): void {
    const day = DateComponent.DAY_NAMES[today.getDay()];
    const date = `${today.getDate()}`;
    const month = DateComponent.MONTH_NAMES[today.getMonth()];
    this.setState({
      day,
      date,
      month
    });
  }
}

export { DateComponent as Date };
