import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
// import { FocusStyleManager } from '@blueprintjs/core';
import CraftFrame from './CraftFrame/CraftFrame';

// FocusStyleManager.onlyShowFocusOnTabs();
const rootEl = document.getElementById('root');

ReactDOM.render(<CraftFrame />, rootEl);

serviceWorker.unregister();
