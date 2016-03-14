import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './components/app/app';
import Students from './pages/students';
import Student from './pages/student';
import Create from './pages/create';

injectTapEventPlugin();

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Students} />
      <Route path="/update/:id" component={Student} />
      <Route path="/create" component={Create} />
    </Route>
  </Router>,
  document.getElementById('app'));
