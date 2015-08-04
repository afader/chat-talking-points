var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var appConstants = require('../constants/appConstants.js');

var factorActions = {
  addFactor: function(factor) {
    AppDispatcher.handleAction({
      actionType: appConstants.ADD_FACTOR,
      data: factor
    });
  },
  removeFactor: function(index) {
    AppDispatcher.handleAction({
      actionType: appConstants.REMOVE_FACTOR,
      data: index
    });
  }
};

module.exports = factorActions;
