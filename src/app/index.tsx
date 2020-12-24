import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from "react-redux";

import { store } from "@app/redux/store";

import { App } from '@app/components/App';
import { AppInitialiser } from '@app/services/app-initialiser';
import { initRootElements } from '@app/utils/root';

import './styles/main.scss';

const { appRoot } = initRootElements();

AppInitialiser.init();

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  appRoot
);
