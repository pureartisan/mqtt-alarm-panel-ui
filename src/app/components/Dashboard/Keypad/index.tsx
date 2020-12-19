import React from 'react';
import classNames from 'classnames';

import './style.scss';

interface KeypadProps {
  hasValue?: boolean
  onKeyPressed?: (value: number) => void
  onCleared?: () => void
  onSubmitted?: () => void
}

interface KeypadState {}

class KeypadComponent extends React.Component<KeypadProps, KeypadState> {

  state: KeypadState = {};

  render() {
    return (
      <div className="Keypad">
        <div className="keys">
          <div className="row">
            <div className="key" onClick={() => this.handleKeyClicked(1)}>1</div>
            <div className="key" onClick={() => this.handleKeyClicked(2)}>2</div>
            <div className="key" onClick={() => this.handleKeyClicked(3)}>3</div>
          </div>
          <div className="row">
            <div className="key" onClick={() => this.handleKeyClicked(4)}>4</div>
            <div className="key" onClick={() => this.handleKeyClicked(5)}>5</div>
            <div className="key" onClick={() => this.handleKeyClicked(6)}>6</div>
          </div>
          <div className="row">
            <div className="key" onClick={() => this.handleKeyClicked(7)}>7</div>
            <div className="key" onClick={() => this.handleKeyClicked(8)}>8</div>
            <div className="key" onClick={() => this.handleKeyClicked(9)}>9</div>
          </div>
          <div className="row">
            <div className={classNames("key clear-button", {
              disabled: !this.props.hasValue
            })} onClick={this.handleClearClicked}>×</div>
            <div className="key" onClick={() => this.handleKeyClicked(0)}>0</div>
            <div className={classNames("key done-button", {
              disabled: !this.props.hasValue
            })} onClick={this.handleDoneClicked}>✓</div>
          </div>
        </div>
      </div>
    );
  }

  private handleKeyClicked = (num: number): void => {
    if (this.props.onKeyPressed) {
      this.props.onKeyPressed(num);
    }
  };

  private handleClearClicked = (): void => {
    if (this.props.onCleared) {
      this.props.onCleared();
    }
  };

  private handleDoneClicked = (): void => {
    if (this.props.onSubmitted) {
      this.props.onSubmitted();
    }
  };

}

// const mapStateToProps = (state: ReduxState, ownProps: Partial<KeypadProps>): Partial<KeypadProps> => ({
//   armed: false // TODO get from stage
// });

// export const Keypad = connect(mapStateToProps)(KeypadComponent);

export { KeypadComponent as Keypad };