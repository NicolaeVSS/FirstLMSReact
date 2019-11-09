/* eslint-disable */

import jquery from 'jquery';
window.$ = window.jQuery=jquery; // because linting doesnt let jquery happen, since react does what jquery does

// ES6 style import
import React from 'react';
import ReactDom from 'react-dom';
import {HashRouter} from 'react-router-dom'; // navigation, from one page to another

import {App} from './components/app.js'; // controller component

ReactDom.render((
  // wrap app.js into hashrouter
    <HashRouter>
      <App />
    </HashRouter>
  ), document.getElementById('app')); // app is the parent component
  