import React from 'react';

import { Date as DateComp } from './Date';
import { Clock } from './Clock';

import './style.scss';

type ColorMode = 'dark' | 'light';

interface DateTimeProps {
  mode?: ColorMode
}

interface DateTimeState {}

class DateTime extends React.Component<DateTimeProps, DateTimeState> {

  static defaultProps: DateTimeProps = {
    mode: 'light'
  };

  state: DateTimeState = {};

  render() {
    return (
      <div className={`DateTime mode-${this.props.mode}`}>
        <DateComp />
        <Clock />
      </div>
    );
  }

}

export { DateTime };
