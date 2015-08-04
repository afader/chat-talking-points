// Browser globals
window.jquery = require('jquery');
window.$ = require('jquery');
require('../css/bootstrap.css');
require('../css/main.css');

var App = require('./components/App.js');

var React = require('react');
React.render(<App/>, document.body);
