import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

const app = document.getElementById('app');
ReactDOM.render(
  <Router>
    <App />
  </Router>
,app);
