import React from 'react';
import { connect } from 'react-redux';

import { ReduxState } from '@app/redux/reducers';
import { ConfigService } from '@app/services/config';

import { VideoButton } from '../VideoButton';
import { SettingsButton } from '../SettingsButton';
import { ArmOptions } from '../ArmOptions';

import './style.scss';

interface ArmScreenProps {}

interface ArmScreenState {}

class ArmScreenComponent extends React.Component<ArmScreenProps, ArmScreenState> {

  state: ArmScreenState = {};

  render() {
    return (
      <div className="ArmScreen">
        <div className="title">System<br/>Disarmed</div>
        <ArmOptions />
        <div className="action-bar">
          {ConfigService.config.video_stream?.url && (
            <VideoButton />
          )}
          <SettingsButton />
        </div>
      </div>
    );
  }

}

// const mapStateToProps = (state: ReduxState, ownProps: Partial<ArmScreenProps>): Partial<ArmScreenProps> => ({
//   armingCountdown: state.armed.pending
// });

// export const ArmScreen = connect(mapStateToProps)(ArmScreenComponent);

export { ArmScreenComponent as ArmScreen };