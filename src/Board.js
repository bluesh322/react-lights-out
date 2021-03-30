import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

const cloneDeep = require('lodash/cloneDeep');

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard( nrows, ncols, chanceLightStartsOn));

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard(nrows, ncols, chanceLightStartsOn) {
    let initialBoard = [];
    for(let i = 0; i < nrows; i++) {
      initialBoard.push(Array.from({length: ncols}).map(() => {
        if(Math.random() * 1 < chanceLightStartsOn) return true;
        else return false;
      }));
    }

    return initialBoard;
  }

  function hasWon() {
    return !board.some(x => x.includes(true));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      let newBoard = cloneDeep(oldBoard);


      flipCell(y, x, newBoard);
      flipCell(y+1, x, newBoard);
      flipCell(y, x+1, newBoard);
      flipCell(y-1, x, newBoard);
      flipCell(y, x-1, newBoard);

      return newBoard;
    });
  }

  return hasWon() ? (
    <div>
      <h1>You Won!</h1>
    </div>
  ): (
    <table className="Board">
      <thead>
        <tr>
          <th>Lights Out Game</th>
        </tr>
      </thead>
      <tbody>
        {board.map((row, rowIdx) => 
        <tr>
          {row.map((cell, colIdx) => <Cell flipCellsAroundMe={flipCellsAround} isLit={cell} coords={`${rowIdx}-${colIdx}`}/>)}
        </tr>)}
      </tbody>
    </table>
  )
  
}

Board.defaultProps = {nrows:5,ncols:5,chanceLightStartsOn: .5}

export default Board;
