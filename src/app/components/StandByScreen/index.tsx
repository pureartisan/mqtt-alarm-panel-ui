import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

import { ReduxState } from '@app/redux/reducers';

import { StandByService } from '@app/services/stand-by';

import { DateTime } from './DateTime';

import './style.scss';

interface StandByScreenProps {
  armed?: boolean;
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
        <DateTime />
      </div>
    );
  }

  private handleStandByClick = () => {
    StandByService.disableStandBy();
  };
}

const mapStateToProps = (state: ReduxState, ownProps: Partial<StandByScreenProps>): Partial<StandByScreenProps> => ({
  armed: false // TODO get from stage
});

export const StandByScreen = connect(mapStateToProps)(StandByScreenComponent);
