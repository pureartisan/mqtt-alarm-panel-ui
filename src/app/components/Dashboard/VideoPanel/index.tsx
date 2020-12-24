import React from 'react';
import { connect } from 'react-redux';

import { ReduxState } from '@app/redux/reducers';
import { AudioService } from '@app/services/audio';
import { ConfigService } from '@app/services/config';

import { Modal } from '@app/components/ui/Modal';

import './style.scss';

interface VideoPanelProps {
  onClosed?: () => void
}

interface VideoPanelState {}

class VideoPanelComponent extends React.Component<VideoPanelProps, VideoPanelState> {

  state: VideoPanelState = {};

  render() {
    return (
      <Modal
        onClickedOutside={this.handleClickedOutsideModal}
      >
        <div className="VideoPanel">
          <img src={ConfigService.config.video_stream?.url} />
        </div>
      </Modal>
    );
  }

  private handleClickedOutsideModal = (): void => {
    if (this.props.onClosed) {
      this.props.onClosed();
    }
  };

}

// const mapStateToProps = (state: ReduxState, ownProps: Partial<VideoPanelProps>): Partial<VideoPanelProps> => ({
//   now: state.time.now
// });

// export const VideoPanel = connect(mapStateToProps)(VideoPanelComponent);

export { VideoPanelComponent as VideoPanel };