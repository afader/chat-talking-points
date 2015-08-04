var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var appConstants = require('../constants/appConstants.js');

var chatActions = {
  sendMessage: function(message) {
    AppDispatcher.handleAction({
      actionType: appConstants.SEND_MESSAGE,
      data: message
    });
  }
};

module.exports = chatActions;
