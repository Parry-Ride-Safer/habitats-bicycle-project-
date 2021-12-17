import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import FormComponent from "./Components/Login/index";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <FormComponent/>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
