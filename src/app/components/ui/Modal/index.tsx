import React from 'react';
import ReactDom from 'react-dom';

import { modalRoot } from '@app/utils/root';

import './style.scss';

interface ModalProps {
  title?: string
  onClickedOutside?: () => void // TODO
  children?: React.ReactNode | React.ReactNode[]
}

interface ModalState {}

export class Modal extends React.Component<ModalProps, ModalState> {

  state: ModalState = {};

  private el: HTMLElement;

  constructor(props: ModalProps) {
    super(props);

    this.el = document.createElement('div');
    this.el.classList.add('Modal');
  }

  componentDidMount() {
    // The portal element is inserted in the DOM tree after
    // the Modal's children are mounted, meaning that children
    // will be mounted on a detached DOM node. If a child
    // component requires to be attached to the DOM tree
    // immediately when mounted, for example to measure a
    // DOM node, or uses 'autoFocus' in a descendant, add
    // state to Modal and only render the children when Modal
    // is inserted in the DOM tree.
    modalRoot.appendChild(this.el);
    document.addEventListener('click', this.handleAllClicks, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleAllClicks, false);
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDom.createPortal(
      (
        <div className="modal-inner">
          {this.props.title && (
            <div className="modal-title">
              {this.props.title}
            </div>
          )}
          <div className="modal-body">
            {this.props.children}
          </div>
        </div>
      ),
      this.el
    );
  }

  private handleAllClicks = (e: MouseEvent): void => {
    if (e.target !== this.el && this.el?.contains(e.target as any)) {
      return;
    }
    // clicked outside
    if (this.props.onClickedOutside) {
      this.props.onClickedOutside();
    }
  };
}