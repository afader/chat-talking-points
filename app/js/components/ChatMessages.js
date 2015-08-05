var React = require('react');
var Bootstrap = require('react-bootstrap');
var ChatMessage = require('./ChatMessage.js');
var ChatMessages = React.createClass({
  componentWillUpdate: function() {
    var node = this.getDOMNode();
    var innerHeight = $(node).innerHeight();
    var position = node.scrollTop + innerHeight;
    var fudgeHeight = 10;
    this.shouldScrollBottom = position + fudgeHeight >= node.scrollHeight;
  },
  componentDidUpdate: function() {
    if (this.shouldScrollBottom) {
      var node = this.getDOMNode();
      node.scrollTop = node.scrollHeight;
    }
  },
  render: function() {
    var makeMessage = function(message, i) {
      return <ChatMessage key={i} message={message}/>;
    };
    return (
      <div className='chatMessages'>
       {this.props.messages.map(makeMessage)}
      </div>
    );
  }
});
module.exports = ChatMessages;
