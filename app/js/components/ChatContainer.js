var React = require('react');
var ChatInput = require('./ChatInput.js');
var ChatMessages = require('./ChatMessages.js');
var chatStore = require('../stores/chatStore.js');
var chatActions = require('../actions/chatActions.js');

var ChatContainer = React.createClass({
  getInitialState: function() {
    return {
      messages: chatStore.getMessages()
    };
  },
  componentDidMount: function() {
    chatStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    chatStore.removeChangeListener(this._onChange);
  },
  handleSendMessage: function(message) {
    chatActions.sendMessage(message);
  },
  _onChange: function() {
    this.setState({
      messages: chatStore.getMessages()
    });
  },
  render: function() {
    return (
      <div className='chatContainer'>
	<h3>Chat Room</h3>
	<ChatMessages messages={this.state.messages}/>
	<ChatInput send={this.handleSendMessage}/>
      </div>
    );
  }
});

module.exports = ChatContainer;
