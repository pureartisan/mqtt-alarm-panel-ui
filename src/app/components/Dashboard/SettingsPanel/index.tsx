import React from 'react';
import { connect } from 'react-redux';

import { ReduxState } from '@app/redux/reducers';

import { VolumeBadge } from '@app/components/badges/VolumeBadge';

import './style.scss';
import { AudioService } from '@app/services/audio';

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

  private node: React.RefObject<HTMLDivElement> = React.createRef();

  componentDidMount() {
    document.addEventListener('click', this.handleAllClicks, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleAllClicks, false);
  }

  componentDidUpdate(prevProps: SettingsPanelProps): void {
    if (this.props.volume !== prevProps.volume) {
      this.setState({
        value: this.props.volume
      });
    }
  }

  render() {
    return (
      <div className="SettingsPanel" ref={this.node}>
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
    );
  }

  private handleAllClicks = (e: MouseEvent): void => {
    if (this.node.current?.contains(e.target as any)) {
      return;
    }
    // clicked outside
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