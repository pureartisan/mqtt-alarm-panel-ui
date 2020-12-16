import React from 'react';
import { connect } from 'react-redux';

import { ReduxState } from '@app/redux/reducers';

import { StandByService } from '@app/services/stand-by';

import { Dashboard } from '@app/components/Dashboard';
import { StandByScreen } from '@app/components/StandByScreen';

interface AppProps {
  standBy?: boolean
}

interface AppState {}

class AppComponent extends React.Component<AppProps, AppState> {

  state: AppState = {
    standBy: false
  };

  componentDidMount() {
    StandByService.listenToUserInteractions();
  }

  componentWillUnmount() {
    StandByService.stopListeningToUserInteractions();
  }

  render() {
    return (
      <div className="App">
        {this.props.standBy ? (
          <StandByScreen />
        ) : (
          <Dashboard />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState, ownProps: Partial<AppProps>): Partial<AppProps> => ({
  standBy: state.standBy.active
});

export const App = connect(mapStateToProps)(AppComponent);
