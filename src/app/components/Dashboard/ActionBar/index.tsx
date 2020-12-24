import React from 'react';
// import { connect } from 'react-redux';

// import { ReduxState } from '@app/redux/reducers';

import './style.scss';

interface ActionBarProps {
  children?: React.ReactNode | React.ReactNode[]
}

interface ActionBarState {}

class ActionBarComponent extends React.Component<ActionBarProps, ActionBarState> {

  state: ActionBarState = {};

  render() {
    return (
      <div className="ActionBar">
        {this.props.children}
      </div>
    );
  }

}

// const mapStateToProps = (state: ReduxState, ownProps: Partial<ActionBarProps>): Partial<ActionBarProps> => ({
//   now: state.time.now
// });

// export const ActionBar = connect(mapStateToProps)(ActionBarComponent);

export { ActionBarComponent as ActionBar }