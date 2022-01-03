import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Fullform from './Components/Login/fullform';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Fullform />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
