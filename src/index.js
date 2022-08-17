import React from 'react';
import ReactDOM from 'react-dom/client';

import * as serviceWorker from './serviceWorker';
import App from './component/App';

import './styles/main.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);

serviceWorker.unregister();
