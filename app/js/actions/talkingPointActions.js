var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var appConstants = require('../constants/appConstants.js');

var talkingPointActions = {
  addTalkingPoint: function(talkingPoint) {
    AppDispatcher.handleAction({
      actionType: appConstants.ADD_TALKING_POINT,
      data: talkingPoint
    });
  },
  removeTalkingPoint: function(id) {
    AppDispatcher.handleAction({
      actionType: appConstants.REMOVE_TALKING_POINT,
      data: id 
    });
  },
  highlightTalkingPoint: function(id) {
    AppDispatcher.handleAction({
      actionType: appConstants.HIGHLIGHT_TALKING_POINT,
      data: id 
    });
  },
  clearTalkingPointHighlight: function() {
    AppDispatcher.handleAction({
      actionType: appConstants.CLEAR_TALKING_POINT_HIGHLIGHT,
      data: null
    });
  }
};

module.exports = talkingPointActions;
