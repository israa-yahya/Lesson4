// index.js (or wherever your app is initialized)

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './i18n'; // Import i18n initialization file

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
