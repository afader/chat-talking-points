var React = require('react');
var Bootstrap = require('react-bootstrap');
var factorTextcomplete = require('../factorTextcomplete.js');
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
  handleEnter: function(e) {
    // Cross-browser way to test for enter.
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13 && !e.shiftKey) {
      this.handleSubmit(e);
    }
  },
  handleChange: function(e) {
    this.setState({value: e.target.value});
  },
  componentDidMount: function() {
    var node = this.getDOMNode();
    var input = $(node).find('textarea');
    factorTextcomplete(input);
  },
  render: function() {

    var button = <span
      className='input-group-addon btn btn-primary'
      onClick={this.handleSubmit}>Send</span>;

    var input = <textarea
      onKeyDown={this.handleEnter}
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
