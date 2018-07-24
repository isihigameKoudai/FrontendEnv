import 'babel-polyfill';
import React from 'react';
import {Route, Switch, Link } from 'react-router-dom';

import Top from './pages/top';
import About from './pages/about';

const App = () => (
  <div>
    <Link to="/">Top</Link>
    <Link to="/about">About</Link>
    <Switch>
      <Route exact path="/" component={Top} />
      <Route path="/about" component={About} />
    </Switch>
  </div>
);

export default App;
