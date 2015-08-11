var React = require('react');
var Bootstrap = require('react-bootstrap');
var ListGroupItem = Bootstrap.ListGroupItem;
var talkingPointStore = require('../stores/talkingPointStore.js');
var talkingPointActions = require('../actions/talkingPointActions.js');
var TalkingPointListItem = React.createClass({
  handleClick: function(e) {
    talkingPointActions.removeTalkingPoint(this.props.id);
  },
  render: function() {
    var id = this.props.id;
    var text = talkingPointStore.getTalkingPointContent(id);
    var active = talkingPointStore.idIsHighlighted(id);
    var buttonProps = {
      className: 'pull-right',
      bsStyle: 'link',
      bsSize: 'xsmall',
      style: {color: 'grey'},
      onClick: this.handleClick
    };
    var button = (
      <Bootstrap.Button {...buttonProps}>
	<Bootstrap.Glyphicon glyph='trash'/>
      </Bootstrap.Button>
    );
    return <ListGroupItem active={active}>{text}{button}</ListGroupItem>;
  }
});
module.exports = TalkingPointListItem;
