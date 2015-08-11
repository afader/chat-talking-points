var React = require('react');
var Bootstrap = require('react-bootstrap');
var ListGroup = Bootstrap.ListGroup;
var ListGroupItem = Bootstrap.ListGroupItem;
var talkingPointStore = require('../stores/talkingPointStore.js');
var TalkingPointList = React.createClass({
  render: function() {
    var makeTalkingPoint = function(item, i) {
      var active = talkingPointStore.indexIsHighlighted(i);
      return <ListGroupItem key={i} active={active}>{item}</ListGroupItem>;
    };
    return (
      <ListGroup>
	{this.props.talkingPoints.map(makeTalkingPoint)}
      </ListGroup>
    );
  }
});
module.exports = TalkingPointList;
