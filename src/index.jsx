import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/app';
import registerServiceWorker from './registerServiceWorker';
import './style.scss';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
