import React from 'react';
import classNames from 'classnames';

import './style.scss';

interface DisplayProps {
  hasError?: boolean
  value?: string
}

interface DisplayState {}

class DisplayComponent extends React.Component<DisplayProps, DisplayState> {

  state: DisplayState = {};

  render() {
    return (
      <div className={classNames('Display', {
        'error': this.props.hasError
      })}>
        <span className="display-text">
          {this.props.value && this.props.value.split('').map(() => '*')}
        </span>
      </div>
    );
  }

}

// const mapStateToProps = (state: ReduxState, ownProps: Partial<DisplayProps>): Partial<DisplayProps> => ({
//   armed: false // TODO get from stage
// });

// export const Display = connect(mapStateToProps)(DisplayComponent);

export { DisplayComponent as Display }