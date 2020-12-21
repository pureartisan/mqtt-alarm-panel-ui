import React from 'react';
import { connect } from 'react-redux';

import { ReduxState } from '@app/redux/reducers';

import './style.scss';

interface VolumeControllerProps {
  volume?: number
  onClosed?: (volume?: number) => void
}

interface VolumeControllerState {
  value?: number
}

class VolumeControllerComponent extends React.Component<VolumeControllerProps, VolumeControllerState> {

  state: VolumeControllerState = {
    value: this.props.volume
  };

  private node: React.RefObject<HTMLDivElement> = React.createRef();

  componentDidMount() {
    document.addEventListener('click', this.handleAllClicks, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleAllClicks, false);
  }

  componentDidUpdate(prevProps: VolumeControllerProps): void {
    if (this.props.volume !== prevProps.volume) {
      this.setState({
        value: this.props.volume
      });
    }
  }

  render() {
    return (
      <div className="VolumeController" ref={this.node}>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={this.state.value || 0}
          onChange={this.handleInputChanged}
        />
        <span className="percentage">
          {Math.round((this.state.value || 0) * 100)}%
        </span>
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
    this.setState({
      value: event?.target?.valueAsNumber
    });
  }

}

// const mapStateToProps = (state: ReduxState, ownProps: Partial<VolumeControllerProps>): Partial<VolumeControllerProps> => ({
//   now: state.time.now
// });

// export const VolumeController = connect(mapStateToProps)(VolumeControllerComponent);

export { VolumeControllerComponent as VolumeController };