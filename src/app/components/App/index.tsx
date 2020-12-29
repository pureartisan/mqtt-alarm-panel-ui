import React from 'react';
import { connect } from 'react-redux';

import { Info } from '@app/info';
import { ReduxState } from '@app/redux/reducers';
import { ArmedStatus } from '@app/redux/actions/armed';
import { StandByService } from '@app/services/stand-by';
import { AudioService } from '@app/services/audio';

import { Dashboard } from '@app/components/Dashboard';
import { StandByScreen } from '@app/components/StandByScreen';

import './style.scss';
import { ConfigService } from '@app/services/config';

interface AppProps {
  standBy?: boolean
  armedStatus?: ArmedStatus,
  prevStatus?: ArmedStatus
}

interface AppState {
  sirenAudio?: HTMLAudioElement | null
}

class AppComponent extends React.Component<AppProps, AppState> {

  state: AppState = {};

  componentDidMount() {
    StandByService.listenToUserInteractions();
  }

  componentWillUnmount() {
    StandByService.stopListeningToUserInteractions();
  }

  componentDidUpdate(prevProps: AppProps) {
    if (prevProps.armedStatus !== this.props.armedStatus) {
      this.handleSiren();
    }
  }

  render() {
    return (
      <div
        className={
          `App env-${Info.env} armed-status-${this.props.armedStatus} prev-armed-status-${this.props.prevStatus}`
        }
      >
        {this.props.standBy ? (
          <StandByScreen />
        ) : (
          <Dashboard />
        )}
      </div>
    );
  }

  private handleSiren(): void {
    if (this.props.armedStatus === 'triggered' && this.props.prevStatus !== 'triggered') {
      const sirenAudio = AudioService.loop('siren', ConfigService.config.siren_volume);
      this.setState({
        sirenAudio
      });
    } else if (this.props.armedStatus !== 'triggered') {
      this.state.sirenAudio?.pause();
      this.setState({
        sirenAudio: null
      });
    }
  }
}

const mapStateToProps = (state: ReduxState, ownProps: Partial<AppProps>): Partial<AppProps> => ({
  standBy: state.standBy.active,
  armedStatus: state.armed.status,
  prevStatus: state.armed.prevStatus
});

export const App = connect(mapStateToProps)(AppComponent);
