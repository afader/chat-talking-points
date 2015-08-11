require('jquery-textcomplete');
var talkingPointStore = require('./stores/talkingPointStore.js');

var strategy = {
  match: /(?:\B|^)#(\w*)$/,
  search: function(term, callback) {
    callback(talkingPointStore.talkingPointsStartingWith(term));
  },
  template: function(value) {
    return talkingPointStore.getTalkingPointContent(value);
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
