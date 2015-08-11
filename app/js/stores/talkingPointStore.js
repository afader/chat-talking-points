var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var appConstants = require('../constants/appConstants.js');
var InvertedIndex = require('../InvertedIndex.js');

var _store = {
  talkingPoints: [],
  index: new InvertedIndex()
};

var addTalkingPoint = function(talkingPoint) {
  var index = _store.talkingPoints.length;
  _store.talkingPoints.push(talkingPoint);
  _store.index.addDocument(index, talkingPoint);
};

var removeTalkingPoint = function(index) {
  _store.talkingPoints.splice(index, 1);
  _store.index.removeDocument(index);
};

var talkingPointStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb) {
    this.on(appConstants.CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb) {
    this.removeListener(appConstants.CHANGE_EVENT, cb);
  },
  getTalkingPoints: function() {
    return _store.talkingPoints;
  },
  talkingPointsStartingWith: function(prefix) {
    return _store.index.prefixSearch(prefix);
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.actionType) {
    case appConstants.ADD_TALKING_POINT:
      addTalkingPoint(action.data);
      talkingPointStore.emit(appConstants.CHANGE_EVENT);
      break;
    case appConstants.REMOVE_TALKING_POINT:
      removeTalkingPoint(action.data);
      talkingPointStore.emit(appConstants.CHANGE_EVENT);
      break;
    default:
      return true;
  };
});

module.exports = talkingPointStore;
