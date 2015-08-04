var React = require('react');
var Bootstrap = require('react-bootstrap');
var Col = Bootstrap.Col;
var Row = Bootstrap.Row;
var Grid = Bootstrap.Grid;
var ChatContainer = require('./ChatContainer.js');
var FactorContainer = require('./FactorContainer.js');

var App = React.createClass({
  render: function() {
    return (
      <Grid>
	<Row>
	  <Col md={6}>
	    <ChatContainer/>
	  </Col>
	  <Col md={4}>
	    <FactorContainer/>
	  </Col>
	</Row>
      </Grid>
    );
  }
});

module.exports = App;
