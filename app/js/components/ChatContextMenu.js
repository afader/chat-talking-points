var React = require('react');
var Bootstrap = require('react-bootstrap');
var context = require('../context.js');
var factorActions = require('../actions/factorActions.js');
var selectedTextToFactor = function(e) {
  if (e) {
    e.preventDefault();
  }
  if (window.getSelection) {
    var text = window.getSelection().toString();
    factorActions.addFactor(text);
  }
};
var ChatContextMenu = React.createClass({
  componentDidMount: function() {
    context.init({fadeSpeed: 0});
    context.attach('.chatMessage', [{
      text: 'Add to Factors',
      action: selectedTextToFactor
    }]);
  },
  render: function() {
    return null;
  }
});
module.exports = ChatContextMenu;
