import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

import { ReduxState } from '@app/redux/reducers';
import { ArmedStatus } from '@app/redux/actions/armed';

import { ArmScreen } from './ArmScreen';
import { DisarmScreen } from './DisarmScreen';
import { NavBar } from './NavBar';

import './style.scss';

interface DashboardProps {
  armed?: ArmedStatus;
  connected?: boolean;
}

class DashboardComponent extends React.Component<DashboardProps> {

  render() {
    return (
      <div
        className={classnames("Dashboard", {
          'is-armed': this.props.armed,
          [`armed-${this.props.armed}`]: this.props.armed
        })}
      >
        <NavBar />
        {!this.props.connected && (
          <div className="disconnected"></div>
        )}
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
  armed: state.armed.status,
  connected: state.connection.status
});

export const Dashboard = connect(mapStateToProps)(DashboardComponent);
