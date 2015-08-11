var React = require('react');
var TalkingPointRef = require('./TalkingPointRef.js');
var chatMessageParser = require('../chatMessageParser.js');
var ChatMessage = React.createClass({
  renderMessagePart: function(part, key) {
    switch(part.type) {
      case chatMessageParser.partTypes.PLAIN:
	return part.content;
      case chatMessageParser.partTypes.BREAK:
	return <br key={key}/>;
      case chatMessageParser.partTypes.TALKING_POINT:
	return <TalkingPointRef id={part.id} key={key}/>;
      default:
	throw 'Unknown message part type: ' + part.type;
    };
  },
  render: function() {
    var message = this.props.message;
    var messageParts = chatMessageParser.parse(message);
    var elements = messageParts.map(this.renderMessagePart);
    return <div className='chatMessage img-rounded'>{elements}</div>;
  }
});
module.exports = ChatMessage;
