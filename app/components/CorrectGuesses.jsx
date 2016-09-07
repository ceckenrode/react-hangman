var React = require('react');

module.exports = React.createClass({
  //we created a displayedWord helper function to return what should
  //be displayed to the user. There's no need to set this to state and we
  //never mutate props
  render: function() {
    return (
      <div>
        <h4>
          {this.displayedWord(this.props.word)}
        </h4>
      </div>
    );
  },
  displayedWord: function(word) {
    return word.split('').map(function(letter, index) {
      if (letter === " "){
        return " "
      }
      else if (this.props.lettersGuessed.indexOf(letter.toLowerCase()) === -1){
        if (word.length -1 === index) {
          return "_";
        } else {
          return "_,";
        }
      } else {
        return letter;
      }
    }, this)
  }
});
