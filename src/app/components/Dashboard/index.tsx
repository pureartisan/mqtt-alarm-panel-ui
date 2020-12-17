import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

import { ReduxState } from '@app/redux/reducers';
import { ArmedStatus } from '@app/redux/actions/armed';

import { ArmScreen } from './ArmScreen';
import { DisarmScreen } from './DisarmScreen';

import './style.scss';

interface DashboardProps {
  armed?: ArmedStatus;
}

class DashboardComponent extends React.Component<DashboardProps> {

  render() {
    return (
      <div
        className={classnames("Dashboard", {
          'armed': this.props.armed
        })}
      >
        {this.props.armed ? (
          <DisarmScreen />
        ) : (
          <ArmScreen />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState, ownProps: Partial<DashboardProps>): Partial<DashboardProps> => ({
  armed: state.armed.status
});

export const Dashboard = connect(mapStateToProps)(DashboardComponent);
