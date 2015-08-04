var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var appConstants = require('../constants/appConstants.js');

var _store = {
  messages: [ ]
};

var sendMessage = function(message) {
  _store.messages.push(message);
};

var chatStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb) {
    this.on(appConstants.CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb) {
    this.on(appConstants.CHANGE_EVENT, cb);
  },
  getMessages: function() {
    return _store.messages;
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.actionType) {
    case appConstants.SEND_MESSAGE:
      sendMessage(action.data);
      chatStore.emit(appConstants.CHANGE_EVENT);
      break
    default:
      return true;
  };
});

module.exports = chatStore;
