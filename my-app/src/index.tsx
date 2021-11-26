import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/* Individual squares are not concerned with state. The board holds the square's states and modifies them
 * by passing its own state down as a prop to the squares. See handleClick(i) as a concrete example of this.
 *
 * Whenever a square is clicked, the board's handeClick(i) function is called (<Square onClick=handleClick(i))
*/

/* make a property (props) and state definition for squares */
type SquareProps = {
  value: string|undefined /* a square is either X, O, or empty/undefined */
  onClick: () => void
}

type SquareState = {
  value: string|undefined
}

class Square extends React.Component<SquareProps, SquareState> { /* Pass in SquareProps for Square objects */
    render() { /* Returns a JSX element that represents a component of the site */
      return (
        <button 
          className="square" 
          onClick={ () => this.props.onClick() }>
            {this.props.value}
        </button>
      );
    }
  }

  type BoardProps = {
    squares: Array<string|undefined> /* a board's squares must be X, O, or empty/undefined */
  }

  type BoardState = {
    squares: Array<string|undefined>
  }

  class Board extends React.Component<BoardProps, BoardState> {
    constructor (props: BoardProps) {
      super(props)
      this.state = {
        squares: new Array<undefined>(9)
      }
    }
    
    /* A parent passes its state (mutable) down to its children as a prop (immutable). Board -> square */
    handleClick(i: number) {
      const squares = this.state.squares.slice()
      squares[i] = "X"
      this.setState({squares: squares})
    }

    renderSquare(i: number) {
      return (
        <Square 
          value={this.state.squares[i]} 
          onClick={() => this.handleClick(i)} />
      )
    }
  
    render() {
      const status = 'Next player: X';
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board squares={new Array<undefined>(9)}/>
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  