import React from 'react';
import classNames from 'classnames';

import { Button } from '@app/components/ui/Button';

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
            <Button className="key" onClick={() => this.handleKeyClicked(1)}>1</Button>
            <Button className="key" onClick={() => this.handleKeyClicked(2)}>2</Button>
            <Button className="key" onClick={() => this.handleKeyClicked(3)}>3</Button>
          </div>
          <div className="row">
            <Button className="key" onClick={() => this.handleKeyClicked(4)}>4</Button>
            <Button className="key" onClick={() => this.handleKeyClicked(5)}>5</Button>
            <Button className="key" onClick={() => this.handleKeyClicked(6)}>6</Button>
          </div>
          <div className="row">
            <Button className="key" onClick={() => this.handleKeyClicked(7)}>7</Button>
            <Button className="key" onClick={() => this.handleKeyClicked(8)}>8</Button>
            <Button className="key" onClick={() => this.handleKeyClicked(9)}>9</Button>
          </div>
          <div className="row">
            <Button className={classNames("key clear-button", {
              disabled: !this.props.hasValue
            })} onClick={this.handleClearClicked}>×</Button>
            <Button className="key" onClick={() => this.handleKeyClicked(0)}>0</Button>
            <Button className={classNames("key done-button", {
              disabled: !this.props.hasValue
            })} onClick={this.handleDoneClicked}>✓</Button>
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