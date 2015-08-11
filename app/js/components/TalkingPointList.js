var React = require('react');
var Bootstrap = require('react-bootstrap');
var ListGroup = Bootstrap.ListGroup;
var TalkingPointListItem = require('./TalkingPointListItem.js');
var TalkingPointList = React.createClass({
  render: function() {
    var makeTalkingPoint = function(id, i) {
      return <TalkingPointListItem key={id} id={id}/>;
    };
    return (
      <ListGroup>
	{this.props.talkingPoints.map(makeTalkingPoint)}
      </ListGroup>
    );
  }
});
module.exports = TalkingPointList;
