import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

import { ReduxState } from '@app/redux/reducers';
import { ArmedStatus } from '@app/redux/actions/armed';

import { AudioService } from '@app/services/audio';
import { StandByService } from '@app/services/stand-by';

import { ShieldBadge } from '@app/components/badges/ShieldBadge';

import { DateTime } from './DateTime';
import { NoiseGenerator } from './NoiseGenerator';

import './style.scss';

interface StandByScreenProps {
  armed?: ArmedStatus;
  connected?: boolean;
  date?: Date
}

class StandByScreenComponent extends React.Component<StandByScreenProps> {

  render() {
    const showNoise = this.showNoise();

    return (
      <div
        className={classnames("StandByScreen", {
          'armed': this.props.armed
        })}
        onClick={this.handleStandByClick}
      >
        {!this.props.connected && (
          <div className="disconnected"></div>
        )}
        {showNoise && (
          <NoiseGenerator />
        )}
        {!showNoise && (
          <>
            <DateTime />
            {this.props.armed && (
              <ShieldBadge animation={false} />
            )}
          </>
        )}
      </div>
    );
  }

  /**
   * Show noise between 2am and 8am
   */
  private showNoise(): boolean {
    const currentHour = this.props?.date?.getHours() || 0;
    // NOTE: should be `>=` and `<` (not including range end)
    return currentHour >= 2 && currentHour < 8;
  }

  private handleStandByClick = () => {
    AudioService.play('click');
    StandByService.disableStandBy();
  };
}

const mapStateToProps = (state: ReduxState, ownProps: Partial<StandByScreenProps>): Partial<StandByScreenProps> => ({
  armed: state.armed.status,
  connected: state.connection.status,
  date: state.time.now
});

export const StandByScreen = connect(mapStateToProps)(StandByScreenComponent);
