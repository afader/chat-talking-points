var React = require('react');
var AddFactor = require('./AddFactor.js');
var FactorList = require('./FactorList.js');
var factorStore = require('../stores/factorStore.js');
var factorActions = require('../actions/factorActions.js');

var FactorContainer = React.createClass({
  getInitialState: function() {
    return {
      factors: factorStore.getFactors()
    };
  },
  componentDidMount: function() {
    factorStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    factorStore.removeChangeListener(this._onChange);
  },
  handleAddFactor: function(newFactor) {
    factorActions.addFactor(newFactor);
  },
  handleRemoveFactor: function(index) {
    factorActions.removeFactor(index);
  },
  _onChange: function() {
    this.setState({
      factors: factorStore.getFactors()
    });
  },
  render: function() {
    return (
      <div>
	<h3>Factors</h3>
	<FactorList factors={this.state.factors} remove={this.handleRemoveFactor}/>
	<AddFactor add={this.handleAddFactor}/>
      </div>
    );
  }
});

module.exports = FactorContainer;
