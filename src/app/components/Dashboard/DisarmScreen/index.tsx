import React from 'react';

import { AlarmService } from '@app/services/alarm';

import { Keypad } from '../Keypad';
import { ArmedStatus } from '../ArmedStatus';
import { Display } from '../Display';

import './style.scss';

const MAX_CHARS = 8;
const MAX_CHARS_INDICATOR_DELAY = 1000; // 1 second

interface DisarmScreenProps {}

interface DisarmScreenState {
  value?: string,
  showError?: boolean
}

class DisarmScreenComponent extends React.Component<DisarmScreenProps, DisarmScreenState> {

  state: DisarmScreenState = {
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
      <div className="DisarmScreen">
        <Keypad
          hasValue={Boolean(this.state.value)}
          onCleared={this.handleCleared}
          onSubmitted={this.handleSubmitted}
          onKeyPressed={this.handleKeyPressed}
        />
        <div className="info">
          <Display
            value={this.state.value}
            hasError={this.state.showError}
          />
          <ArmedStatus />
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

  private handleKeyPressed = (num: number): void => {
    this.addNumberToValue(num);
  };

  private handleCleared = (): void => {
    this.clearValue();
  };

  private handleSubmitted = (): void => {
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

// const mapStateToProps = (state: ReduxState, ownProps: Partial<DisarmScreenProps>): Partial<DisarmScreenProps> => ({
//   c: state.armed.pending
// });

// export const DisarmScreen = connect(mapStateToProps)(DisarmScreenComponent);

export { DisarmScreenComponent as DisarmScreen };