var React = require('react');
var Bootstrap = require('react-bootstrap');
var ListGroup = Bootstrap.ListGroup;
var ListGroupItem = Bootstrap.ListGroupItem;
var FactorList = React.createClass({
  render: function() {
    var makeFactor = function(item, i) {
      return <ListGroupItem key={i}>{item}</ListGroupItem>;
    };
    return (
      <ListGroup>
	{this.props.factors.map(makeFactor)}
      </ListGroup>
    );
  }
});
module.exports = FactorList;
