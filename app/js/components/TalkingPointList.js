var React = require('react');
var Bootstrap = require('react-bootstrap');
var ListGroup = Bootstrap.ListGroup;
var ListGroupItem = Bootstrap.ListGroupItem;
var TalkingPointList = React.createClass({
  render: function() {
    var makeTalkingPoint = function(item, i) {
      return <ListGroupItem key={i}>{item}</ListGroupItem>;
    };
    return (
      <ListGroup>
	{this.props.talkingPoints.map(makeTalkingPoint)}
      </ListGroup>
    );
  }
});
module.exports = TalkingPointList;
