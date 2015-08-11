var React = require('react');
var talkingPointActions = require('../actions/talkingPointActions.js');
var talkingPointStore = require('../stores/talkingPointStore.js');
var TalkingPointRef = React.createClass({
  getInitialState: function() {
    return {index: talkingPointStore.indexForId(this.props.id)};
  },
  _onChange: function() {
    this.setState({index: talkingPointStore.indexForId(this.props.id)});
  },
  hasReferant: function() {
    return this.state.index >= 0;
  },
  handleClick: function(e) {
    e.preventDefault();
    $(this.getDOMNode()).blur(); // make :hover etc. still work
  },
  componentDidMount: function() {                                               
    talkingPointStore.addChangeListener(this._onChange);                        
  },                                                                            
  componentWillUnmount: function() {                                            
    talkingPointStore.removeChangeListener(this._onChange);                     
  },
  handleMouseOver: function(e) {
    talkingPointActions.highlightTalkingPoint(this.state.index);
  },
  handleMouseOut: function(e) {
    talkingPointActions.clearTalkingPointHighlight();
  },
  render: function() {
    var content = '#' + this.props.id;
    if (this.hasReferant()) {
      var props = {
        'href': '#',
        onClick: this.handleClick,
        onMouseOver: this.handleMouseOver,
        onMouseOut: this.handleMouseOut
      };
      return <a {...props}>{content}</a>;
    } else {
      return <span>{content}</span>;
    }
  }
});
module.exports = TalkingPointRef;
