import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/* Individual squares are not concerned with state. The board holds the square's props as its own state. The board modifies squares
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
  onClick: (i: number) => void
}

class Board extends React.Component<BoardProps> {  
  renderSquare(i: number) {
    return (
      <Square 
        value={this.props.squares[i]} 
        onClick={() => this.props.onClick(i)} />
    )
  }

  render() {
    return (
      <div>
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

type GameProps = {
  xIsNext: boolean
}

type GameState = {
  history: (Array<string|undefined>)[],
  xIsNext: boolean,
  stepNumber: number
}

class Game extends React.Component<GameProps, GameState> {
  constructor(props: GameProps) {
    super(props)
    this.state = {
      history: [new Array<undefined>(9)],
      stepNumber: 0,
      xIsNext: true,
    }
  }

  /* A parent passes its state (mutable) down to its children as a prop (immutable). Board -> square */
  handleClick(i: number): void {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = this.state.history[history.length - 1]
    const squares = current.slice()

    if (calculateWinner(squares) !== undefined) { return } /* if someone's already won, do nothing */
    if (squares[i] !== undefined) { return } /* if a filled square is clicked, do nothing */

    squares[i] = this.state.xIsNext ? "X" : "O" /* ternary operator go brrr  */
    this.setState({
      history: history.concat([squares]), /* concat doesn't modify the involved arrays, which is good for immutability */
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    })
  }
  
  jumpTo(step: number): void {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0 /* since x is first (1), this is a valid way to determine the turn */
    })
  }

  render(): JSX.Element {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current)

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    let status;

    if (winner !== undefined) {
      status = "Winner: " + winner
    }
    else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O")
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current} onClick={ (i) => this.handleClick(i) }/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
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
  <Game xIsNext={true}/>,
  document.getElementById('root')
);
