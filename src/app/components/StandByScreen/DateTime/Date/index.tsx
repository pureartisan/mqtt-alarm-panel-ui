import React from 'react';
import { connect } from 'react-redux';

import { ReduxState } from '@app/redux/reducers';

import './style.scss';

interface NameMap {
  [index: string]: string
}

const DAY_NAMES: NameMap = {
  '0': 'Sun',
  '1': 'Mon',
  '2': 'Tue',
  '3': 'Wed',
  '4': 'Thu',
  '5': 'Fri',
  '6': 'Sat'
};

const MONTH_NAMES: NameMap = {
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


type ColorMode = 'dark' | 'light';

interface DateProps {
  date?: Date
  mode?: ColorMode
}

interface DateState {
  day?: string
  month?: string
  date?: string
}

class DateComponent extends React.Component<DateProps, DateState> {

  static defaultProps: DateProps = {
    mode: 'light',
    date: new Date()
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

  private calculateDateParts(today: Date = new Date()): void {
    const day = DAY_NAMES[today.getDay()];
    const date = `${today.getDate()}`;
    const month = MONTH_NAMES[today.getMonth()];
    this.setState({
      day,
      date,
      month
    });
  }
}

const mapStateToProps = (state: ReduxState, ownProps: Partial<DateProps>): Partial<DateProps> => ({
  date: state.time.now
});

const DateComp = connect(mapStateToProps)(DateComponent);

export { DateComp as Date };
