var React = require('react');
var Bootstrap = require('react-bootstrap');
var context = require('../context.js');
var talkingPointActions = require('../actions/talkingPointActions.js');
var selectedTextToTalkingPoint = function(e) {
  if (e) {
    e.preventDefault();
  }
  if (window.getSelection) {
    var text = window.getSelection().toString();
    talkingPointActions.addTalkingPoint(text);
  }
};
var ChatContextMenu = React.createClass({
  componentDidMount: function() {
    context.init({fadeSpeed: 0});
    context.attach('.chatMessage', [{
      text: 'Add to Talking Points',
      action: selectedTextToTalkingPoint
    }]);
  },
  render: function() {
    return null;
  }
});
module.exports = ChatContextMenu;
