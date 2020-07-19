import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/app/App';

window.ga('create', process.env.REACT_APP_ANALYTICS_ID, 'auto')

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
