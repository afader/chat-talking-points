var React = require('react');
var Bootstrap = require('react-bootstrap');
var ListGroupItem = Bootstrap.ListGroupItem;
var talkingPointStore = require('../stores/talkingPointStore.js');
var TalkingPointListItem = React.createClass({
  render: function() {
    var text = this.props.text;
    var index = this.props.index;
    var active = talkingPointStore.indexIsHighlighted(index);
    return <ListGroupItem active={active}>{text}</ListGroupItem>;
  }
});
module.exports = TalkingPointListItem;
