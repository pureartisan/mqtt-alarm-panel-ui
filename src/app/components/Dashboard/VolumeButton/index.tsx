import React from 'react';
import { connect } from 'react-redux';

import { ReduxState } from '@app/redux/reducers';

import { ConfigService } from '@app/services/config';
import { AudioService } from '@app/services/audio';

import { VolumeController } from '../VolumeController';

import './style.scss';

interface VolumeButtonProps {}

interface VolumeButtonState {
  showController?: boolean
}

class VolumeButtonComponent extends React.Component<VolumeButtonProps, VolumeButtonState> {

  state: VolumeButtonState = {};

  render() {
    const volume = ConfigService.config.general_volume;
    const volume3 = volume && volume >= 0.75;
    const volume2 = volume && volume >= 0.5;
    const volume1 = volume && volume >= 0.25;
    const muted = !volume;

    return (
      <div className="VolumeButton">
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
              width:'100%',
              height:'100%',
              background: 'transparent'
            }}
          >
            <g
              style={{
                transformOrigin: '50% 50%',
                transform: 'rotate(0deg) scale(0.8, 0.8)',
              }}
            >
              {volume3 && (
                <g>
                  <path
                    fill="#829985"
                    d="M69.8 82.6c-1.2 0-2.3-.6-2.9-1.7-.9-1.6-.4-3.7 1.2-4.6 9.4-5.4 15.2-15.5 15.2-26.3s-5.8-20.9-15.2-26.3c-1.6-.9-2.2-3-1.2-4.6.9-1.6 3-2.2 4.6-1.2C82.9 24.5 90 36.8 90 50s-7.1 25.5-18.6 32.2c-.5.3-1.1.4-1.6.4z"
                    style={{
                      fill:'rgb(130, 153, 133)'
                    }}
                  ></path>
                </g>
              )}
              {volume2 && (
                <g>
                  <path
                    fill="#a8b980"
                    d="M63.4 71.6c-1.2 0-2.3-.6-2.9-1.7-.9-1.6-.4-3.7 1.2-4.6 5.5-3.2 8.9-9.1 8.9-15.4s-3.4-12.2-8.9-15.4c-1.6-.9-2.2-3-1.2-4.6.9-1.6 3-2.2 4.6-1.2 7.5 4.4 12.2 12.5 12.2 21.2s-4.7 16.8-12.2 21.2c-.5.4-1.1.5-1.7.5z"
                    style={{
                      fill: 'rgb(168, 185, 128)'
                    }}
                  ></path>
                </g>
              )}
              {volume1 && (
                <g>
                  <path
                    fill="#f0af6b"
                    d="M57.1 60.7c-1.2 0-2.3-.6-2.9-1.7-.9-1.6-.4-3.7 1.2-4.6C57 53.5 58 51.8 58 50c0-1.8-1-3.5-2.6-4.4-1.6-.9-2.2-3-1.2-4.6.9-1.6 3-2.2 4.6-1.2 3.6 2.1 5.9 6 5.9 10.2s-2.3 8.1-5.9 10.2c-.6.3-1.1.5-1.7.5z"
                    style={{
                      fill: 'rgb(240, 175, 107)'
                    }}
                  ></path>
                </g>
              )}
              {muted && (
                <g>
                  <path
                    d="M85 40l-5-5-10 10-10-10-5 5 10 10-10 10 5 5 10-10 10 10 5-5-10-10z"
                    fill="#b93a38"
                    style={{
                      fill: 'rgb(185, 58, 56)'
                    }}
                  ></path>
                </g>
              )}
              <g>
                <path
                  fill="#333"
                  d="M44.2 24.3L28.7 36.6l-.3.3H11.9c-1.1 0-1.9.9-1.9 1.9v22.3c0 1.1.9 1.9 1.9 1.9h16.4l.3.3 15.5 12.4c1.3 1 3.1.1 3.1-1.5V25.8c.1-1.6-1.7-2.5-3-1.5z"
                  style={{
                    fill: 'rgb(51, 51, 51)'
                  }}
                ></path>
              </g>
            </g>
          </svg>
        </div>
        {this.state.showController && (
          <VolumeController
            volume={volume}
            onClosed={this.handleVolumeControllerClosed}
          />
        )}
      </div>
    );
  }

  private handleButtonClicked = () => {
    AudioService.play('click');
    this.setState({
      showController: true
    });
  };

  private handleVolumeControllerClosed = (volume?: number) => {
    ConfigService.saveConfig('general_volume', volume || 0);
    this.setState({
      showController: false
    });
  };

}

// const mapStateToProps = (state: ReduxState, ownProps: Partial<VolumeButtonProps>): Partial<VolumeButtonProps> => ({
//   volume: 0
// });

// export const VolumeButton = connect(mapStateToProps)(VolumeButtonComponent);

export { VolumeButtonComponent as VolumeButton }