import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from 'components/app';
import registerServiceWorker from './registerServiceWorker';
import reducers from './ducks';
import { resize } from './ducks/viewport';

import './style.scss';

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

function onResize({ target }) {
  const { innerWidth: width, innerHeight: height } = target;
  store.dispatch(resize(width, height));
}
window.addEventListener('resize', onResize);
onResize({ target: window });

const { NODE_ENV, PORT } = process.env;
const { hostname } = location;
const port = NODE_ENV !== 'production'
  ? `:${PORT || (NODE_ENV === 'development' ? 3001 : 3000)}`
  : '';

const ws = new WebSocket(`wss://${hostname}${port}/dungeon`);
ws.addEventListener('message', ({ data }) => console.log(data));
ws.addEventListener('open', () => {
  ws.send('test');
});

registerServiceWorker();
