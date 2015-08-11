var React = require('react');
var talkingPointActions = require('../actions/talkingPointActions.js');
var talkingPointStore = require('../stores/talkingPointStore.js');
var TalkingPointRef = React.createClass({
  getInitialState: function() {
    return {hasReferant: talkingPointStore.hasId(this.props.id)};
  },
  _onChange: function() {
    this.setState({hasReferant: talkingPointStore.hasId(this.props.id)});
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
    talkingPointActions.highlightTalkingPoint(this.props.id);
  },
  handleMouseOut: function(e) {
    talkingPointActions.clearTalkingPointHighlight();
  },
  render: function() {
    var content = '#' + this.props.id;
    if (this.state.hasReferant) {
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
