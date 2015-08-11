var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var appConstants = require('../constants/appConstants.js');
var invertedIndex = require('../invertedIndex.js');

var numIdTokens = 5;

var _store = {
  talkingPoints: [],
  index: invertedIndex.createIndex(),
  talkingPointIds: []
};

var formId = function(prefix, suffix) {
  return suffix ? prefix + '-' + suffix : prefix;
};

var idExists = function(prefix, suffix) {
  var id = formId(prefix, suffix);
  return _store.talkingPointIds.indexOf(id) >= 0;
};

var createTalkingPointId = function(string) {
  var tokens = invertedIndex.tokenize(string.toLowerCase());
  var idPrefix = tokens.slice(0, numIdTokens).join('-');
  var idSuffix = null;
  while (idExists(idPrefix, idSuffix)) {
    idSuffix += 1;
  }
  return formId(idPrefix, idSuffix);
};

var addTalkingPoint = function(talkingPoint) {
  var index = _store.talkingPoints.length;
  var id = createTalkingPointId(talkingPoint);
  _store.talkingPoints.push(talkingPoint);
  _store.talkingPointIds[index] = id;
  _store.index.addDocument(index, talkingPoint);
};

var removeTalkingPoint = function(index) {
  _store.talkingPoints.splice(index, 1);
  _store.index.removeDocument(index);
  _store.talkingPointIds.splice(index, 1);
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
  },
  getTalkingPointIds: function() {
    return _store.talkingPointIds;
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
