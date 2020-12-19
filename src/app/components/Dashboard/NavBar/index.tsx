import React from 'react';
// import { connect } from 'react-redux';

// import { ReduxState } from '@app/redux/reducers';

import { DateTime } from '../DateTime';

import './style.scss';

interface NavBarProps {
  now?: Date
}

interface NavBarState {}

class NavBarComponent extends React.Component<NavBarProps, NavBarState> {

  state: NavBarState = {};

  render() {
    return (
      <div className="NavBar">
        <span className="title">Smart Security</span>
        <DateTime />
      </div>
    );
  }

}

// const mapStateToProps = (state: ReduxState, ownProps: Partial<NavBarProps>): Partial<NavBarProps> => ({
//   now: state.time.now
// });

// export const NavBar = connect(mapStateToProps)(NavBarComponent);

export { NavBarComponent as NavBar }