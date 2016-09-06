var React = require('react');
var CorrectGuesses = require('./CorrectGuesses');
var IncorrectGuesses = require('./IncorrectGuesses');
var Modal = require('./Modal');
var definitions = require('../../lib/definitions');
require('../stylesheets/app.css');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      words: [
        "Component",
        "LifeCycle Method",
        "Mixins",
        "state",
        "props",
        "render",
        "CreateClass",
        "JSX"
      ],
      guessesLeft: 10,
      wins: 0,
      loses: 0,
      currentWord: null,
      lettersGuessed: [],
      correctLetters: [],
      gameOver: false,
      modalOpen: false
    };
  },
  componentWillMount: function() {
    this.setState({
      currentWord: this.state.words[Math.floor(Math.random() * this.state.words.length)]
    });
    document.addEventListener('keydown', this.handleUserGuess, false);
  },
  render: function() {
    var gameInProgress = (
      <div className="game-container">
        <h3 onClick={this.toggleModal}>{this.state.currentWord}</h3>
        <p>You have {this.state.guessesLeft} guesses left.</p>
        <span>{this.state.wins} wins </span>
        <span>{this.state.loses} loses </span>
        <CorrectGuesses lettersGuessed={this.state.lettersGuessed} word={this.state.currentWord}/>
        <IncorrectGuesses lettersGuessed={this.state.lettersGuessed} />
        <Modal open={this.state.modalOpen}
          word={this.state.currentWord}
          definition={definitions[this.state.currentWord]}
          toggleModal={this.toggleModal}
        />
      </div>
    );
    var gameComplete = (
      <div>
        <h1>GAME OVER</h1>
        <p>You have {this.state.wins} wins and {this.state.loses} loses</p>
        <button onClick={this.playAgain}>Play Again?</button>
      </div>
    )
    return this.state.gameOver ? gameComplete : gameInProgress;
  },
  handleUserGuess: function(e) {
    if (e.keyCode < 65 || e.keyCode > 90) {
      return;
    } else if (this.state.lettersGuessed.indexOf(e.key) === -1) {
      this.setState({
        lettersGuessed: this.state.lettersGuessed.concat([e.key])
      });
      if (this.state.currentWord.toLowerCase().split('').indexOf(e.key) !== -1) {
        this.handleCorrectGuess(e.key);
      } else {
        this.handleWrongGuess();
      }
    }
  },
  handleWrongGuess: function() {
    this.setState({
      guessesLeft: this.state.guessesLeft - 1
    });
    if (this.state.guessesLeft < 1) {
      this.resetGame();
    }
  },
  resetGame: function() {
    if (this.state.words.length === 1) {
      this.setState({gameOver: true});
    } else {
      this.setState({
        lettersGuessed: [],
        correctLetters: [],
        words: this.state.words.filter(function(word) {
          return word !== this.state.currentWord;
        }, this),
        guessesLeft: 10
      });
      this.setState({
      currentWord: this.state.words[Math.floor(Math.random() * this.state.words.length)]});
    }
  },
  handleCorrectGuess: function(character) {
    for (var i = 0; i < this.state.currentWord.length; i++) {
      if (this.state.currentWord[i].toLowerCase() === character) {
        this.setState({
          correctLetters: this.state.correctLetters.concat([character])
        });
      }
    }
    if (this.state.currentWord.replace(' ', '').length === this.state.correctLetters.length) {
      this.setState({
        wins: this.state.wins + 1
      });
      this.resetGame();
    }
  },
  playAgain: function(){
    this.setState(this.getInitialState());
    this.setState({
    currentWord: this.state.words[Math.floor(Math.random() * this.state.words.length)]});
  },
  toggleModal: function(){
    this.setState({modalOpen: !this.state.modalOpen});
  }
});
