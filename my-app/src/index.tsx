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

/* Returns a JSX element that represents a component of the site */
function Square(props: SquareProps): JSX.Element {
return (
  <button className="square" onClick={props.onClick}>
    {props.value}
  </button>
)
}

type BoardProps = {
  squares: Array<string|undefined>, /* a board's squares must be X, O, or empty/undefined */
  xIsNext: boolean,
}

type BoardState = {
  squares: Array<string|undefined>,
  xIsNext: boolean
}

class Board extends React.Component<BoardProps, BoardState> {
  constructor (props: BoardProps) {
    super(props)
    this.state = {
      squares: new Array<undefined>(9),
      xIsNext: true
    }
  }
  
  /* A parent passes its state (mutable) down to its children as a prop (immutable). Board -> square */
  handleClick(i: number) {
    if (calculateWinner(this.state.squares) !== undefined) { return } /* if someone's already won, do nothing */
    if (this.state.squares[i] !== undefined) { return } /* if a filled square is clicked, do nothing */

    const squares = this.state.squares.slice()
    squares[i] = this.state.xIsNext ? "X" : "O" /* ternary operator go brrr  */
    
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    })
  }

  renderSquare(i: number) {
    return (
      <Square 
        value={this.state.squares[i]} 
        onClick={() => this.handleClick(i)} />
    )
  }

  render() {
    const winner = calculateWinner(this.state.squares)
    let status;
    if (winner !== undefined) {
      status = "Winner: " + winner
    }
    else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O")
    }

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
          <Board squares={new Array<undefined>(9)} xIsNext={true}/>
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares: Array<string|undefined>): string|undefined {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return undefined;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
