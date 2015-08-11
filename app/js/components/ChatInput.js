var React = require('react');
var Bootstrap = require('react-bootstrap');
var talkingPointTextcomplete = require('../talkingPointTextcomplete.js');
var Button = Bootstrap.Button;
var Input = Bootstrap.Input;
var ChatInput = React.createClass({
  getInitialState: function() {
    return {
      value: ''
    };
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var message = this.state.value.trim();
    if (message) {
      this.props.send(this.state.value);
    }
    this.setState({value: ''});
  },
  handleKeyDown: function(e) {
    // Cross-browser way to test for enter.
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13 && !e.shiftKey && !this.preventSubmit) {
      this.handleSubmit(e);
    }
  },
  handleChange: function(e) {
    this.setState({value: e.target.value});
  },
  textcompleteSelect: function(e) {
    this.preventSubmit = true;
    this.handleChange(e);
    // This is a hack to prevent submitting during textcomplete
    setTimeout(function() {
      this.preventSubmit = false;
    }.bind(this), 100);
  },
  componentDidMount: function() {
    this.preventSubmit = false;
    var node = this.getDOMNode();
    var $input = $(node).find('textarea');
    talkingPointTextcomplete($input);
    $input.on('textComplete:select', this.textcompleteSelect);
  },
  render: function() {

    var button = <span
      className='input-group-addon btn btn-primary'
      onClick={this.handleSubmit}>Send</span>;

    var input = <textarea
      onKeyDown={this.handleKeyDown}
      onChange={this.handleChange}
      className='form-control custom-control sendButton'
      value={this.state.value}/>;

    return (
      <div className='chatInput input-group'>
	{input}
	{button}
      </div>
    );
  }
});
module.exports = ChatInput;
