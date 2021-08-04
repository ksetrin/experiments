import React from 'react';
import Square from './Square';

interface Props {
  board: string[];
  handleClick(index: number): void;
}

const Board = ({board, handleClick}: Props) => {
  const renderSquare = (value: any, index: number) => {
    return <Square key={index} value={value} index={index} handleClick={handleClick} />;
  };
  return <div className="board">{board.map(renderSquare)}</div>;
};
export default Board;
