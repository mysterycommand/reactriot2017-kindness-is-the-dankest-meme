import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import App from 'components/app';
import registerServiceWorker from './registerServiceWorker';
import reducers from './ducks';

import createWindowDispatcher from './dispatchers/window';
import createSocketDispatcher from './dispatchers/socket';
import ws from './socket';

import './style.scss';

const store = createStore(
  reducers,
  applyMiddleware(thunk.withExtraArgument(ws)),
);
createWindowDispatcher(window, store);
createSocketDispatcher(ws, store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
