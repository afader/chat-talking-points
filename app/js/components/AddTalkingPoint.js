var React = require('react');
var Bootstrap = require('react-bootstrap');
var Button = Bootstrap.Button;
var Input = Bootstrap.Input;
var AddTalkingPoint = React.createClass({
  getInitialState: function() {
    return {value: ''};
  },
  handleChange: function(e) {
    this.setState({value: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    this.props.add(this.state.value);
    this.setState({value: ''});
  },
  render: function() {
    var button = <Button>Add</Button>;
    var input = <Input
      buttonAfter={button}
      onChange={this.handleChange}
      type='text'
      placeholder='Add a talking point'
      value={this.state.value}/>; 
    return (
      <form onSubmit={this.handleSubmit}>
	{input}
      </form>
    );
  }
});
module.exports = AddTalkingPoint;
