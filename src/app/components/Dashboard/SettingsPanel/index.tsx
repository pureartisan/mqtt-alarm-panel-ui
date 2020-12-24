import React from 'react';
import { connect } from 'react-redux';

import { ReduxState } from '@app/redux/reducers';
import { AudioService } from '@app/services/audio';

import { Modal } from '@app/components/ui/Modal';
import { VolumeBadge } from '@app/components/badges/VolumeBadge';

import './style.scss';

interface SettingsPanelProps {
  volume?: number
  onClosed?: (volume?: number) => void
}

interface SettingsPanelState {
  value?: number
}

class SettingsPanelComponent extends React.Component<SettingsPanelProps, SettingsPanelState> {

  state: SettingsPanelState = {
    value: this.props.volume
  };

  componentDidUpdate(prevProps: SettingsPanelProps): void {
    if (this.props.volume !== prevProps.volume) {
      this.setState({
        value: this.props.volume
      });
    }
  }

  render() {
    return (
      <Modal
        title="Volume Control"
        onClickedOutside={this.handleClickedOutsideModal}
      >
        <div className="SettingsPanel">
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={this.state.value || 0}
            onChange={this.handleInputChanged}
          />
          <div className="volume-wrapper">
            <VolumeBadge volume={this.state.value} />
            <span className="percentage">
              {Math.round((this.state.value || 0) * 100)}%
            </span>
          </div>
        </div>
      </Modal>
    );
  }

  private handleClickedOutsideModal = (): void => {
    if (this.props.onClosed) {
      this.props.onClosed(this.state.value);
    }
  };

  private handleInputChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const volume = event?.target?.valueAsNumber;
    AudioService.play('click', volume);
    this.setState({
      value: volume
    });
  }

}

// const mapStateToProps = (state: ReduxState, ownProps: Partial<SettingsPanelProps>): Partial<SettingsPanelProps> => ({
//   now: state.time.now
// });

// export const SettingsPanel = connect(mapStateToProps)(SettingsPanelComponent);

export { SettingsPanelComponent as SettingsPanel };