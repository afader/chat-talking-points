require('jquery-textcomplete');
var talkingPointStore = require('./stores/talkingPointStore.js');

var strategy = {
  match: /(?:\B|^)#(\w*)$/,
  search: function(term, callback) {
    callback(talkingPointStore.talkingPointsStartingWith(term));
  },
  template: function(value) {
    return talkingPointStore.getTalkingPoints()[value];
  },
  replace: function(value) {
    var names = talkingPointStore.getTalkingPointIds();
    var name = names[value];
    return '#' + name + ' ';
  },
  index: 1
};

var addTextcomplete = function($textarea) {
  return $textarea.textcomplete([strategy]);
};

module.exports = addTextcomplete;
