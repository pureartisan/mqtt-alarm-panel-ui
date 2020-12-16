import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

import { ReduxState } from '@app/redux/reducers';

import './style.scss';

interface DashboardProps {
  armed?: boolean;
}

class DashboardComponent extends React.Component<DashboardProps> {

  render() {
    return (
      <div
        className={classnames("Dashboard", {
          'armed': this.props.armed
        })}
      >
        Dashboard
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState, ownProps: Partial<DashboardProps>): Partial<DashboardProps> => ({
  armed: false // TODO get from stage
});

export const Dashboard = connect(mapStateToProps)(DashboardComponent);
