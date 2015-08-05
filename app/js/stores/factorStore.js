var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var appConstants = require('../constants/appConstants.js');
var InvertedIndex = require('../InvertedIndex.js');

var _store = {
  factors: [],
  index: new InvertedIndex()
};

var addFactor = function(factor) {
  var index = _store.factors.length;
  _store.factors.push(factor);
  _store.index.addDocument(index, factor);
};

var removeFactor = function(index) {
  _store.factors.splice(index, 1);
  _store.index.removeDocument(index);
};

var factorStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb) {
    this.on(appConstants.CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb) {
    this.removeListener(appConstants.CHANGE_EVENT, cb);
  },
  getFactors: function() {
    return _store.factors;
  },
  factorsStartingWith: function(prefix) {
    return _store.index.prefixSearch(prefix);
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.actionType) {
    case appConstants.ADD_FACTOR:
      addFactor(action.data);
      factorStore.emit(appConstants.CHANGE_EVENT);
      break;
    case appConstants.REMOVE_FACTOR:
      removeFactor(action.data);
      factorStore.emit(appConstants.CHANGE_EVENT);
      break;
    default:
      return true;
  };
});

module.exports = factorStore;
