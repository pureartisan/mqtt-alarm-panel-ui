import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

import { ReduxState } from '@app/redux/reducers';

import './style.scss';

interface KeypadProps {
  armed?: boolean;
}

interface KeypadState {
  value?: string
}

class KeypadComponent extends React.Component<KeypadProps, KeypadState> {

  state: KeypadState = {
    value: ''
  };

  render() {
    return (
      <div className="Keypad">
        <div className="display">
          <span className="displayText">
            {this.state.value && this.state.value.split('').map(() => '*')}
          </span>
        </div>
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
            <div className="key" onClick={this.handleClearClicked}>clear</div>
            <div className="key" onClick={() => this.handleKeyClicked(0)}>0</div>
            <div className="key" onClick={this.handleDoneClicked}>done</div>
          </div>
        </div>
      </div>
    );
  }

  private handleKeyClicked = (num: number): void => {
    this.setState({
      value: `${this.state.value || ''}${num}`
    });
  };

  private handleClearClicked = (): void => {
    this.setState({
      value: ''
    });
  };

  private handleDoneClicked = (): void => {
    // TODO test
    console.log(this.state.value);
  };

}

const mapStateToProps = (state: ReduxState, ownProps: Partial<KeypadProps>): Partial<KeypadProps> => ({
  armed: false // TODO get from stage
});

export const Keypad = connect(mapStateToProps)(KeypadComponent);
