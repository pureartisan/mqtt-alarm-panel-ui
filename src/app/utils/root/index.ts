let appRoot = document.createElement('div');
appRoot.id = 'app-root';

let modalRoot = document.createElement('div');
modalRoot.id = 'modal-root';

const initRootElements = (): {
  appRoot: HTMLElement,
  modalRoot: HTMLElement,
} => {
  document.body.appendChild(appRoot);
  document.body.appendChild(modalRoot);
  return {
    appRoot,
    modalRoot
  };
};

export {
  initRootElements,
  appRoot,
  modalRoot
}