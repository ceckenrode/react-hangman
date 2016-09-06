var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <em>{this.props.lettersGuessed.join(', ')}</em>
      </div>
    );
  }
});
