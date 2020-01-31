import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import CraftFrame from './CraftFrame/CraftFrame';

const rootEl = document.getElementById('root');

ReactDOM.render(<CraftFrame />, rootEl);

serviceWorker.unregister();
