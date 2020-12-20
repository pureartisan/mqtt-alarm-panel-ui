import React from 'react';
import classNames from 'classnames';

import { AudioService } from '@app/services/audio';

import './style.scss';

interface ButtonProps {
  onClick?: () => void
  className?: string
  disabled?: boolean
  children?: React.ReactNode | React.ReactNode[]
}

interface ButtonState {
  active?: boolean
}

class ButtonComponent extends React.Component<ButtonProps, ButtonState> {

  state: ButtonState = {
    active: false
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
      <div
        className={classNames('Button', this.props.className, {
          disabled: this.props.disabled,
          active: this.state.active
        })}
        onClick={this.handleClicked}
      >
        {this.props.children}
      </div>
    );
  }

  private handleClicked = (): void => {
    if (this.props.onClick) {
      this.props.onClick();
    }
    AudioService.play('click');
  };

}

export { ButtonComponent as Button };