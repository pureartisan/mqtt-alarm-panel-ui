import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

import { ReduxState } from '@app/redux/reducers';
import { AlarmService } from '@app/services/alarm';

import './style.scss';

const MAX_CHARS = 8;
const MAX_CHARS_INDICATOR_DELAY = 1000; // 1 second

interface KeypadProps {
  armed?: boolean;
}

interface KeypadState {
  value?: string,
  showError?: boolean
}

class KeypadComponent extends React.Component<KeypadProps, KeypadState> {

  state: KeypadState = {
    value: '',
    showError: false
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
          'error': this.state.showError
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
      this.showErrorIndicator();
    } else {
      this.setState({
        value: `${curr}${num}`
      });
    }
  }

  private showErrorIndicator(clearValue?: boolean): void {
    if (this.mounted) {
      const clearError = () => {
        this.hideErrorIndicator();
        if (clearValue) {
          this.clearValue();
        }
      };

      this.setState({
        showError: true
      },
        () => setTimeout(clearError, MAX_CHARS_INDICATOR_DELAY)
      );
    }
  }

  private hideErrorIndicator(): void {
    if (this.mounted) {
      this.setState({
        showError: false
      });
    }
  }

  private handleKeyClicked = (num: number): void => {
    this.addNumberToValue(num);
  };

  private handleClearClicked = (): void => {
    this.clearValue();
  };

  private handleDoneClicked = (): void => {
    if (this.state.value) { // only when there is a value
      const success = AlarmService.disarm(this.state.value);
      if (!success) {
        this.showErrorIndicator(true);
      }
    }
  };

  private clearValue(): void {
    if (this.state.value) { // only when there is a value
      this.setState({
        value: ''
      });
    }
  }

}

const mapStateToProps = (state: ReduxState, ownProps: Partial<KeypadProps>): Partial<KeypadProps> => ({
  armed: false // TODO get from stage
});

export const Keypad = connect(mapStateToProps)(KeypadComponent);
