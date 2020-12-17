import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

import { ReduxState } from '@app/redux/reducers';

import './style.scss';
import { AlarmService } from '@app/services/alarm';

const MAX_CHARS = 8;
const MAX_CHARS_INDICATOR_DELAY = 1000; // 1 second

interface KeypadProps {
  armed?: boolean;
}

interface KeypadState {
  value?: string,
  maxCharsReached?: boolean
}

class KeypadComponent extends React.Component<KeypadProps, KeypadState> {

  state: KeypadState = {
    value: '',
    maxCharsReached: false
  };

  private mounted = false;

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <div className="Keypad">
        <div className={classNames('display', {
          'max-chars-reached': this.state.maxCharsReached
        })}>
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
            <div className={classNames("key clear-button", {
              disabled: !this.state.value
            })} onClick={this.handleClearClicked}>×</div>
            <div className="key" onClick={() => this.handleKeyClicked(0)}>0</div>
            <div className={classNames("key done-button", {
              disabled: !this.state.value
            })} onClick={this.handleDoneClicked}>done</div>
          </div>
        </div>
      </div>
    );
  }

  private addNumberToValue(num: number): void {
    const curr = this.state.value || '';
    if (curr.length >= MAX_CHARS) {
      this.showMaxCharsReachedIndicator();
    } else {
      this.setState({
        value: `${curr}${num}`
      });
    }
  }

  private showMaxCharsReachedIndicator(): void {
    if (this.mounted) {
      this.setState({
        maxCharsReached: true
      }, () => setTimeout(
        () => this.hideMaxCharsReachedIndicator(),
        MAX_CHARS_INDICATOR_DELAY
      ));
    }
  }

  private hideMaxCharsReachedIndicator(): void {
    if (this.mounted) {
      this.setState({
        maxCharsReached: false
      });
    }
  }

  private handleKeyClicked = (num: number): void => {
    this.addNumberToValue(num);
  };

  private handleClearClicked = (): void => {
    if (this.state.value) { // only when there is a value
      this.setState({
        value: ''
      });
    }
  };

  private handleDoneClicked = (): void => {
    if (this.state.value) { // only when there is a value
      AlarmService.disarm(this.state.value);
    }
  };

}

const mapStateToProps = (state: ReduxState, ownProps: Partial<KeypadProps>): Partial<KeypadProps> => ({
  armed: false // TODO get from stage
});

export const Keypad = connect(mapStateToProps)(KeypadComponent);
