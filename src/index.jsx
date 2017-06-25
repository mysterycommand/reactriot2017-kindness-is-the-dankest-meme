import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from 'components/app';
import registerServiceWorker from './registerServiceWorker';
import reducers from './ducks';

import createWindowDispatcher from './dispatchers/window';
import createSocketDispatcher from './dispatchers/socket';

import './style.scss';

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

createWindowDispatcher(store);
createSocketDispatcher(store);

registerServiceWorker();
