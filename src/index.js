import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import { unregister } from './registerServiceWorker';
import './oroPolyfill';

const render = () => ReactDOM.render(<App />, document.getElementById("root"));
render();

// ReactDOM.render(<App />, document.getElementById('root'));
unregister();
