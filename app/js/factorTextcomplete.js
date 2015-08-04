require('jquery-textcomplete');
var factorStore = require('./stores/factorStore.js');

var strategy = {
  match: /\B#(\w+)$/,
  search: function(term, callback) {
    callback(factorStore.factorsStartingWith(term));
  },
  template: function(value) {
    return factorStore.getFactors()[value];
  },
  replace: function(value) {
    return '#' + value + ' ';
  },
  index: 1
};

var addTextcomplete = function($textarea) {
  return $textarea.textcomplete([strategy]);
};

module.exports = addTextcomplete;
