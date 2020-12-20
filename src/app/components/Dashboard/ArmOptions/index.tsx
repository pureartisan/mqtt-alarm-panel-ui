import React from 'react';

import { AudioService } from '@app/services/audio';
import { AlarmService } from '@app/services/alarm';

import './style.scss';

interface ArmOptionsProps {}

interface ArmOptionsState {}

class ArmOptionsComponent extends React.Component<ArmOptionsProps, ArmOptionsState> {

  state: ArmOptionsState = {};

  render() {
    return (
      <div className="ArmOptions">
        <div className="buttons">
          <span className="arm-button arm-home" onClick={this.handleArmHomeClicked}>Arm<br/>Now</span>
          <span className="arm-button arm-away" onClick={this.handleArmAwayClicked}>Arm<br/>Away</span>
        </div>
      </div>
    );
  }

  private handleArmHomeClicked = () => {
    AlarmService.armHome();
    AudioService.play('click');
  };

  private handleArmAwayClicked = () => {
    AlarmService.armAway();
    AudioService.play('click');
  };

}

// const mapStateToProps = (state: ReduxState, ownProps: Partial<ArmOptionsProps>): Partial<ArmOptionsProps> => ({
//   armed: false // TODO get from stage
// });

// export const ArmOptions = connect(mapStateToProps)(ArmOptionsComponent);

export { ArmOptionsComponent as ArmOptions };
