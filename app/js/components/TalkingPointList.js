var React = require('react');
var Bootstrap = require('react-bootstrap');
var ListGroup = Bootstrap.ListGroup;
var TalkingPointListItem = require('./TalkingPointListItem.js');
var TalkingPointList = React.createClass({
  render: function() {
    var makeTalkingPoint = function(item, i) {
      return <TalkingPointListItem key={i} text={item} index={i}/>;
    };
    return (
      <ListGroup>
	{this.props.talkingPoints.map(makeTalkingPoint)}
      </ListGroup>
    );
  }
});
module.exports = TalkingPointList;
