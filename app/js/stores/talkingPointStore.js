var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var appConstants = require('../constants/appConstants.js');
var invertedIndex = require('../invertedIndex.js');

// This controls the number of tokens used to create a talking point id
var numIdTokens = 5;

var _store = {
  talkingPoints: {},
  talkingPointList: [],
  index: invertedIndex.createIndex(),
  highlightedId: null
};

var formId = function(prefix, suffix) {
  return suffix ? prefix + '-' + suffix : prefix;
};

var idExists = function(prefix, suffix) {
  var id = formId(prefix, suffix);
  return id in _store.talkingPoints;
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
  var id = createTalkingPointId(talkingPoint);
  _store.talkingPoints[id] = talkingPoint;
  _store.talkingPointList.push(id);
  _store.index.addDocument(id, talkingPoint);
};

var removeTalkingPoint = function(id) {
  delete _store.talkingPoints[id];
  var index = _store.talkingPointList.indexOf(id);
  _store.talkingPointList.splice(index, 1);
  _store.index.removeDocument(id);
};

var highlightTalkingPoint = function(id) {
  _store.highlightedId = id;
};

var clearTalkingPointHighlight = function() {
  _store.highlightedId = null;
};

var talkingPointStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb) {
    this.on(appConstants.CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb) {
    this.removeListener(appConstants.CHANGE_EVENT, cb);
  },
  getTalkingPointList: function() {
    return _store.talkingPointList;
  },
  talkingPointsStartingWith: function(prefix) {
    return _store.index.prefixSearch(prefix);
  },
  getTalkingPointIds: function() {
    return Object.keys(_store.talkingPoints);
  },
  idIsHighlighted: function(id) {
    return _store.highlightedId == id;
  },
  getTalkingPointContent: function(id) {
    return _store.talkingPoints[id];
  },
  getTalkingPointListIndex: function(id) {
    return _store.talkingPointList.indexOf(id);
  },
  hasId: function(id) {
    return id in _store.talkingPoints;
  },
  getTalkingPointContent: function(id) {
    return _store.talkingPoints[id];
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
    case appConstants.HIGHLIGHT_TALKING_POINT:
      highlightTalkingPoint(action.data);
      talkingPointStore.emit(appConstants.CHANGE_EVENT);
      break;
    case appConstants.CLEAR_TALKING_POINT_HIGHLIGHT:
      clearTalkingPointHighlight();
      talkingPointStore.emit(appConstants.CHANGE_EVENT);
      break;
    default:
      return true;
  };
});

module.exports = talkingPointStore;
