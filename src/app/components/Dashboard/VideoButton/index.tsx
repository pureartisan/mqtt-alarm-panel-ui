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
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            width={130}
            height={130}
            xmlnsXlink="http://www.w3.org/1999/xlink"
            style={{
              width:'100%',
              height:'100%',
              background: 'transparent'
            }}
          >
            <g
              style={{
                transformOrigin: '50% 50%',
                transform: 'rotate(0deg) scale(1, 1)'
              }}
            >
              <g>
                <path
                  d="M89.764 60.828l-3.99 9.633a3.09 3.09 0 0 1-4.038 1.673l-3.483-1.443c-1.211-.501-2.617-.194-3.476.795a32.598 32.598 0 0 1-3.286 3.279c-.994.86-1.305 2.268-.803 3.482l1.445 3.489a3.09 3.09 0 0 1-1.673 4.038l-9.633 3.99a3.09 3.09 0 0 1-4.038-1.673l-1.445-3.489c-.503-1.214-1.719-1.99-3.03-1.895a32.54 32.54 0 0 1-4.642.005c-1.307-.092-2.519.685-3.02 1.896l-1.443 3.483a3.09 3.09 0 0 1-4.038 1.673l-9.633-3.99a3.09 3.09 0 0 1-1.673-4.038l1.443-3.483c.501-1.211.194-2.617-.795-3.476a32.598 32.598 0 0 1-3.279-3.286c-.86-.994-2.268-1.305-3.482-.803l-3.489 1.445a3.09 3.09 0 0 1-4.038-1.673l-3.99-9.633a3.09 3.09 0 0 1 1.673-4.038l3.489-1.445c1.214-.503 1.99-1.719 1.895-3.03a32.54 32.54 0 0 1-.005-4.642c.092-1.307-.685-2.519-1.896-3.02l-3.483-1.443a3.09 3.09 0 0 1-1.673-4.038l3.99-9.633a3.09 3.09 0 0 1 4.038-1.673l3.483 1.443c1.211.501 2.617.194 3.476-.795a32.598 32.598 0 0 1 3.286-3.279c.994-.86 1.305-2.268.803-3.482l-1.445-3.489a3.09 3.09 0 0 1 1.673-4.038l9.633-3.99a3.09 3.09 0 0 1 4.038 1.673l1.445 3.489c.503 1.214 1.719 1.99 3.03 1.895a32.54 32.54 0 0 1 4.642-.005c1.307.092 2.519-.685 3.02-1.896l1.443-3.483a3.09 3.09 0 0 1 4.038-1.673l9.633 3.99a3.09 3.09 0 0 1 1.673 4.038l-1.443 3.483c-.501 1.211-.194 2.617.795 3.476a32.598 32.598 0 0 1 3.279 3.286c.86.994 2.268 1.305 3.482.803l3.489-1.445a3.09 3.09 0 0 1 4.038 1.673l3.99 9.633a3.09 3.09 0 0 1-1.673 4.038l-3.489 1.445c-1.214.503-1.99 1.719-1.895 3.03a32.54 32.54 0 0 1 .005 4.642c-.092 1.307.685 2.519 1.896 3.02l3.483 1.443a3.09 3.09 0 0 1 1.673 4.038z"
                  style={{
                    fill:'rgb(102, 102, 102)'
                  }}
                ></path>
                <circle
                  r="24.4"
                  cy="50"
                  cx="50"
                  style={{
                    fill:'rgb(50, 50, 50)'
                  }}
                ></circle>
                <circle
                  r="15.145"
                  cy="50"
                  cx="50"
                  style={{
                    fill:'var(--color-mute)'
                  }}
                ></circle>
              </g>
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