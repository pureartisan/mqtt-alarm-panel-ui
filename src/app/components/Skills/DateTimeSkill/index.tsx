import React from 'react';
import { connect } from 'react-redux';

import { ReduxState } from '@app/redux/reducers';

import { Date } from '../../StandByScreen/Date';
import { Clock } from '../../StandByScreen/Clock';

import './style.scss';

interface DateTimeSkillMeta {
  data?: {
    date_string?: string
  }
}

interface DateTimeSkillProps {
  style?: any
  meta?: DateTimeSkillMeta
}

class DateTimeSkillComponent extends React.Component<DateTimeSkillProps> {
  render() {
    return (
      <div className="DateTimeSkill" style={this.props.style}>
        <Date />
        <Clock />
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState /*, ownProps*/): Partial<DateTimeSkillProps> => ({
  // TODO
});

export const DateTimeSkill = connect(mapStateToProps)(DateTimeSkillComponent);
