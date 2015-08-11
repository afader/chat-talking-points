var React = require('react');
var Bootstrap = require('react-bootstrap');
var ListGroupItem = Bootstrap.ListGroupItem;
var talkingPointStore = require('../stores/talkingPointStore.js');
var TalkingPointListItem = React.createClass({
  render: function() {
    var id = this.props.id;
    var text = talkingPointStore.getTalkingPointContent(id);
    var active = talkingPointStore.idIsHighlighted(id);
    return <ListGroupItem active={active}>{text}</ListGroupItem>;
  }
});
module.exports = TalkingPointListItem;
