var React = require('react');
var Bootstrap = require('react-bootstrap');
var ChatMessage = React.createClass({
  newlinesToBreaks: function(string) {
    var lines = string.split("\n");
    var elements = [];
    lines.map(function(line, i) {
      if (i > 0) {
	elements.push(<br/>);
      } 
      elements.push(line);
    });
    return elements;
  },
  render: function() {
    var message = this.props.message;
    var elements = this.newlinesToBreaks(message);
    return <div className='chatMessage img-rounded'>{elements}</div>;
  }
});
module.exports = ChatMessage;
