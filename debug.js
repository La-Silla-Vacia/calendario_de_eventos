/*global require,console*/

var lsv = require('lsv-interactive');
import React from 'react';
import ReactDOM from 'react-dom';

import Base from './src/base';
require("./src/base.css"); // this goes outside the callback since otherwise the interactive sometimes fires before the CSS is fully loaded
require("./src/global.css");

lsv("calendario_de_eventos", function (interactive) {
  "use strict";

  if (!interactive) {
    console.log("Interactive calendario_de_eventos not initiated. Exiting.");
    return;
  }

  //MARKUP
  ReactDOM.render((
    <Base {...interactive} />
  ), interactive.el);

}, true); // change this last param to true if you want to skip the DOM checks