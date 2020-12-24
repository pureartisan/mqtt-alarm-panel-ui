import React from 'react';
import { connect } from 'react-redux';

import { ReduxState } from '@app/redux/reducers';

import { ConfigService } from '@app/services/config';
import { AudioService } from '@app/services/audio';

import { VideoPanel } from '../VideoPanel';

import './style.scss';

interface VideoButtonProps {}

interface VideoButtonState {
  showPanel: boolean
}

class VideoButtonComponent extends React.Component<VideoButtonProps, VideoButtonState> {

  state: VideoButtonState = {
    showPanel: false
  };

  render() {
    return (
      <div className="VideoButton">
        <div className="button" onClick={this.handleButtonClicked}>
        <svg
          xmlSpace="preserve"
          viewBox="0 0 100 100"
          y="0"
          x="0"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width={130}
          height={130}
          xmlnsXlink="http://www.w3.org/1999/xlink"
          style={{
            background:'transparent'
          }}
        >
        <g
            style={{
              transformOrigin:'50% 50%',
              transform:'rotate(0deg) scale(1, 1)'
            }}
          >
            <path
              d="M84.9 26.8L63.6 43.7V32.1c0-3.6-2.9-6.5-6.5-6.5H16.5c-3.6 0-6.5 2.9-6.5 6.5v35.7c0 3.6 2.9 6.5 6.5 6.5H57c3.6 0 6.5-2.9 6.5-6.5V56.3l21.3 16.9c2.1 1.7 5.1.2 5.1-2.5V29.3c.1-2.7-3-4.1-5-2.5z"
              style={{
                fill:'var(--color-mute)'
              }}
            ></path>
          </g>
        </svg>
        </div>
        {this.state.showPanel && (
          <VideoPanel
            onClosed={this.handlePanelClosed}
          />
        )}
      </div>
    );
  }

  private handleButtonClicked = (): void => {
    AudioService.play('click');
    this.setState({
      showPanel: true
    });
  };

  private handlePanelClosed = (volume?: number): void => {
    AudioService.play('click');
    this.setState({
      showPanel: false
    });
  };

}

// const mapStateToProps = (state: ReduxState, ownProps: Partial<VideoButtonProps>): Partial<VideoButtonProps> => ({
//   volume: 0
// });

// export const VideoButton = connect(mapStateToProps)(VideoButtonComponent);

export { VideoButtonComponent as VideoButton }