import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

import { ReduxState } from '@app/redux/reducers';
import { ArmedStatus } from '@app/redux/actions/armed';

import { AudioService } from '@app/services/audio';
import { StandByService } from '@app/services/stand-by';

import { ShieldBadge } from '@app/components/badges/ShieldBadge';

import { DateTime } from './DateTime';

import './style.scss';

interface StandByScreenProps {
  armed?: ArmedStatus;
  connected?: boolean;
}

class StandByScreenComponent extends React.Component<StandByScreenProps> {

  render() {
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
        <DateTime />
        {this.props.armed && (
          <ShieldBadge animation={false} />
        )}
      </div>
    );
  }

  private handleStandByClick = () => {
    AudioService.play('click');
    StandByService.disableStandBy();
  };
}

const mapStateToProps = (state: ReduxState, ownProps: Partial<StandByScreenProps>): Partial<StandByScreenProps> => ({
  armed: state.armed.status,
  connected: state.connection.status
});

export const StandByScreen = connect(mapStateToProps)(StandByScreenComponent);
