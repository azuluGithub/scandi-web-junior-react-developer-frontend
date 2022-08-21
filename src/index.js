import React from 'react';
import { createRoot } from 'react-dom/client';

import * as serviceWorker from './serviceWorker';
import App from 'Component/App';

import 'Style/main.scss';

const root = createRoot(document.getElementById('root'));

root.render(<App />);

serviceWorker.unregister();
