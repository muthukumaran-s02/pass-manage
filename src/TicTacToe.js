import React from 'react';
import './App.css';

class TicTacToe extends React.Component {
  constructor(props){
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState(){
    return {
      start: 'X',
      value: [' ',' ',' ',' ',' ',' ',' ',' ',' '],
      finished: false,
      message: "Player X turn"
    };
  }

  clear(){
    this.setState(this.getInitialState());
  }

  check(gameState){

    console.log(this.checkRow(gameState, 0), 
    this.checkRow(gameState, 1),
    this.checkRow(gameState, 2),
    this.checkColumn(gameState, 0),
    this.checkColumn(gameState, 1),
    this.checkColumn(gameState, 2),
    this.checkDiagonal(gameState))
    ;
    // Check row
    return this.checkRow(gameState, 0) || 
      this.checkRow(gameState, 1) ||
      this.checkRow(gameState, 2) ||
      this.checkColumn(gameState, 0) ||
      this.checkColumn(gameState, 1) ||
      this.checkColumn(gameState, 2) ||
      this.checkDiagonal(gameState)
      ;
    
  }
  checkRow(gameState, row){
    var index = row * 3;
    if(gameState[index] === gameState[index + 1] &&  gameState[index] === gameState[index + 2]){
      if(gameState[index] === 'X' || gameState[index] === 'O'){
        return gameState[index];
      }
    }
    return null;
  }

  checkColumn(gameState, col){
    var index = col;
    if(gameState[index] === gameState[index + 3] && gameState[index]  === gameState[index + 6]){
      if(gameState[index] === 'X' || gameState[index] === 'O'){
        return gameState[index];
      }
    }
    return null;
  }

  checkDiagonal(gameState){
    if((gameState[0] === gameState[4] && gameState[0] === gameState[8]) ||
      (gameState[2] === gameState[4] &&  gameState[2] === gameState[6])){
        if(gameState[4] === 'X' || gameState[4] === 'O'){
          return gameState[4];
        }
    }
    return null;
  }

  setStateDelta(obj){
    var currentState = this.state;
    var newState = Object.create(currentState);
    Object.assign(newState, obj);
    this.setState(newState);
  }

  handleClick(index){
    var current = this.state.start;
    var gameState = this.state.value;
    var finished = this.state.finished;
    var message = '';
    if(finished){
      return;
    }
    if(gameState[index] !== ' '){
      return;
    }
    gameState[index] = current;
    var result = this.check(gameState);
    if(result){
      finished = true;
      message = "Player " + result + " Won!!!";
    } else {
      current = (current === 'X') ? 'O': 'X';
      message += "Player " + current + " turn";
    }
    this.setStateDelta({
      start: current,
      value: gameState,
      "message": message,
      "finished": finished
    });

  }
  render() {
    return (
      <div className="TicTacToeContainer">
        <div className="text-info">{this.state.message}</div>
        <table className="game-table">
          <tr>
            <td class="game-cell"><GameSlot handleClick={() => this.handleClick(0)} value={this.state.value[0]} /></td>
            <td class="game-cell"><GameSlot handleClick={() => this.handleClick(1)} value={this.state.value[1]} /></td>
            <td class="game-cell"><GameSlot handleClick={() => this.handleClick(2)} value={this.state.value[2]} /></td>
          </tr>
          <tr>
            <td class="game-cell"><GameSlot handleClick={() => this.handleClick(3)} value={this.state.value[3]} /></td>
            <td class="game-cell"><GameSlot handleClick={() => this.handleClick(4)} value={this.state.value[4]} /></td>
            <td class="game-cell"><GameSlot handleClick={() => this.handleClick(5)} value={this.state.value[5]} /></td>
          </tr>        
          <tr>
            <td class="game-cell"><GameSlot handleClick={() => this.handleClick(6)} value={this.state.value[6]} /></td>
            <td class="game-cell"><GameSlot handleClick={() => this.handleClick(7)} value={this.state.value[7]} /></td>
            <td class="game-cell"><GameSlot handleClick={() => this.handleClick(8)} value={this.state.value[8]} /></td>
          </tr>
        </table>
        <button className="button" value="Clear" onClick={() => this.clear()}>Clear</button>
      </div>
    );
  }
}

function GameSlot(props){
  return <div className="game-slot" onClick={props.handleClick}>{props.value}</div>;
}
export default TicTacToe;
