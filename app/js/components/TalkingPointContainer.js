var React = require('react');
var AddTalkingPoint = require('./AddTalkingPoint.js');
var TalkingPointList = require('./TalkingPointList.js');
var talkingPointStore = require('../stores/talkingPointStore.js');
var talkingPointActions = require('../actions/talkingPointActions.js');

var TalkingPointContainer = React.createClass({
  getInitialState: function() {
    return {
      talkingPoints: talkingPointStore.getTalkingPointList()
    };
  },
  componentDidMount: function() {
    talkingPointStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    talkingPointStore.removeChangeListener(this._onChange);
  },
  handleAddTalkingPoint: function(newTalkingPoint) {
    talkingPointActions.addTalkingPoint(newTalkingPoint);
  },
  handleRemoveTalkingPoint: function(index) {
    talkingPointActions.removeTalkingPoint(index);
  },
  _onChange: function() {
    this.setState({
      talkingPoints: talkingPointStore.getTalkingPointList()
    });
  },
  render: function() {
    return (
      <div>
	<h3>Talking Points</h3>
	<TalkingPointList talkingPoints={this.state.talkingPoints} remove={this.handleRemoveTalkingPoint}/>
	<AddTalkingPoint add={this.handleAddTalkingPoint}/>
      </div>
    );
  }
});

module.exports = TalkingPointContainer;
