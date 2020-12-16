import React from 'react';

import { StandByScreen } from '@app/components/StandByScreen';

interface AppState {
  standBy?: boolean;
}

class App extends React.Component<{}, AppState> {

  state: AppState = {
    standBy: true
  };

  render() {
    return (
      <div className="App">
        {this.state.standBy && (
          <StandByScreen />
        )}
      </div>
    );
  }

}

export { App };
