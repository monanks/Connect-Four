import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';
import Typography from 'material-ui/Typography';
import Modal from 'material-ui/Modal';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      now_playing: false,
      game_board: [],
      player1: null,
      player2: null,
      winner: null,
      current_player: null,
      message: '',
      game_over: false,
    }

    this.move = this.move.bind(this);
  }
  
  startGame() {
    // creating a 7*7 game_board
    console.log('hell with you');
    let game_board = [];
    for (let r = 0; r < 7; r++) {
      let empty_row = [];
      for (let c = 0; c < 7; c++) { empty_row.push(null) }
      game_board.push(empty_row);
    }
    console.log(this.state);
    this.setState({
      game_board,
      game_over: false,
      message: '',
      now_playing: true
    });
    console.log(this.state);
  }

  onClickItem(color){
    console.log(color);
    this.setState({
      now_playing : true,
      current_player: color,
      player1: color,
      player2: color === "red" ? "yellow" : "red",
    });
    console.log(this.state);
    this.startGame();
  }
  
  move(c) {
    if (!this.state.game_over) {
      // Placing piece on board
      let valid = true;
      let game_board = this.state.game_board;
      for (let r = 6; r >= 0; r--) {
        if (!game_board[r][c]) {
          game_board[r][c] = this.state.current_player;
          valid = false;
          break;
        }
      }
      if(valid){
        alert('Invalid Move! Try Again');
        return
      }
      // Check status of board
      let result = this.checkStatus(game_board);
      console.log(result);
      if (result === this.state.player1) {
        this.setState({ 
          game_board, 
          game_over: true, 
          message: 'Player 1 ('+ this.state.current_player+') wins!',
          winner: this.state.current_player,
          now_playing: false 
        });
      } else if (result === this.state.player2) {
        this.setState({ 
          game_board, 
          game_over: true, 
          message: 'Player 2 ('+ this.state.current_player+') wins!',
          winner: this.state.current_player,
          now_playing: false 
        });
      } else if (result === -1) {
        this.setState({ 
          game_board, 
          game_over: true, 
          message: 'Draw game.',
          winner: 'white',
          now_playing: false 
        });
      } else {
        this.setState({ 
          ...this.state, 
          game_board, 
          current_player: this.changePlayer() });
      }
    } else {
      this.setState({ 
        message: 'Game over. Please start a new game.',
        game_over: 'true',
        now_playing: false
      });
    }
  }

  checkStatus(game_board) {
    return this.checkWinVertical(game_board)
        || this.checkWinHorizontal(game_board)
        || this.checkWinDiagonalForward(game_board) 
        || this.checkWinDiagonalBackward(game_board)  
        || this.checkGameDraw(game_board);
  }

  checkWinVertical(board) {
    for (let r = 3; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (board[r][c] !== null) {
          if (board[r][c] === board[r - 1][c] && board[r][c] === board[r - 2][c] && board[r][c] === board[r - 3][c]) return board[r][c];
        }
      }
    }
    console.log("vertical");
  }
  
  checkWinHorizontal(board) {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c] !== null) {
          if (board[r][c] === board[r][c + 1] && board[r][c] === board[r][c + 2] && board[r][c] === board[r][c + 3]) return board[r][c];
        }
      }
    }
    console.log("horizontal");
  }
  
  checkWinDiagonalForward(board) {
    for (let r = 3; r < 7; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c] !== null) {
          if (board[r][c] === board[r - 1][c + 1] && board[r][c] === board[r - 2][c + 2] && board[r][c] === board[r - 3][c + 3]) return board[r][c];
        }
      }
    }
    console.log("df");
  }
  
  checkWinDiagonalBackward(board) {
    for (let r = 3; r < 7; r++) {
      for (let c = 3; c < 7; c++) {
        if (board[r][c] !== null) {
          if (board[r][c] === board[r - 1][c - 1] && board[r][c] === board[r - 2][c - 2] && board[r][c] === board[r - 3][c - 3]) return board[r][c];
        }
      }
    }
    console.log("db");
  }
  
  checkGameDraw(board) {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (board[r][c] === null) return null;
      }
    }
    console.log("GD");
    return -1;    
  }

  changePlayer() {
    // console.log(this.state.current_player === this.state.player1);
    return (this.state.current_player === this.state.player1) ? this.state.player2 : this.state.player1;
  }

  render() {
    if(this.state.now_playing === false && this.state.game_over === false){
      return (
        <div className="Game-Page">
          <header className="App-header">
            <img src={logo} className="Game-logo" alt="logo" />
            <h1 className="App-title">Let's Play Connect 4</h1>
            <p className="rules">
            Connect Four is a two-player connection game in which the players first choose a color and then take turns dropping colored discs from the top into a seven-column, six-row vertically suspended grid. The pieces fall straight down, occupying the next available space within the column. The objective of the game is to be the first to form a horizontal, vertical, or diagonal line of four of one's own discs.
            </p>
          </header>
          <p className="Game-intro">
            To get started, Please Select Color
          </p>
          <Button className="Red-color" 
                  variant="fab"
                  aria-label="add" 
                  onClick={()=>{this.onClickItem("red")}}>
            R
          </Button>
          <Button className="Yellow-color" 
                  variant="fab" 
                  aria-label="add"
                  onClick={()=>{this.onClickItem("yellow")}} >
            Y
          </Button>
          {/* <Tooltip id="tooltip-fab" title="Click to see the Rules">
            <Button variant="fab" aria-label="add" className="info-button">
              +
            </Button>
          </Tooltip> */}
          
        </div>
      );
    }
    else if(this.state.now_playing === true && this.state.game_over === false) {
      return (
        <div className="Game-Page">
          <header className="Game-page-header">
            <h1 className="Game-title">Connect 4</h1>
          </header>
          <div id="Game" className="board">
            <table>
              <tbody>
                {this.state.game_board.map((row, i) => (<Row key={i} row={row} move={this.move} />))}
              </tbody>
            </table>
          </div>
        </div>
      )
    }
    else if(this.state.now_playing === false && this.state.game_over === true) {
      let color = this.state.winner + '-disk ' + 'disk'; 
      return (
        <div className="Game-Page">
          <header className="Game-page-header">
            <h1 className="Game-title">Connect 4</h1>
          </header>
          <div id="Game" className="board">
            <p id="win" className="message">
              {this.state.message}
            </p>
            <div className="disks">
              <div className={color}></div>
              <div className={color}></div>
              <div className={color}></div>
              <div className={color}></div>
            </div>
            <Button 
              variant="raised"
              color="" 
              className="new-game"
              onClick={()=>{this.setState({
                now_playing: false,
                game_over: false,
                game_board: []
                });
              }}
              >
            <p className="new-game-button">☺ Start a new Game ☺</p>
            </Button>
          </div>
        </div>
      )
    }
  }
}

const Row = ({ row, move }) => {
  return (
    <tr>
      {row.map((box, i) => <Box key={i} value={box} columnIndex={i} move={move} />)}
    </tr>
  );
};

const Box = ({ value, columnIndex, move }) => {
  let box_class = 'empty-box';
  if (value === 'red') {
    box_class = 'red-box';
  } else if (value === 'yellow') {
    box_class = 'yellow-box';
  }
    
  return (
    <td>
      <div className="box" onClick={() => {move(columnIndex)}}>
        <div className={box_class}></div>
      </div>
    </td>
  );
};

const AppWrapped = withStyles(styles)(App);
export default AppWrapped;
