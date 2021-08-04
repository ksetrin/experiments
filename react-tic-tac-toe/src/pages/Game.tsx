import React from 'react';
import Board from '../components/Board';
import {useDispatch, useSelector} from 'react-redux';
import {board, players, playerTurn, winner} from '../store/selectors';
import {placeAndProceed, setup} from '../store/actions';

const Game = () => {
  const dispatch = useDispatch();

  const gamePlayers = useSelector(players);
  const gameBoard = useSelector(board);
  const gamePlayerTurn = useSelector(playerTurn);
  const gameWinner = useSelector(winner);

  if (gameWinner) {
    alert(`Winner ${gameWinner}`);
    dispatch(setup());
  }
  const handleClick = (index: number): void => {
    if (!gameBoard[index]) {
      dispatch(placeAndProceed(index));
    }
  };
  const handleReStart = () => {
    dispatch(setup());
  };

  const username = gamePlayers[gamePlayerTurn].name;
  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <h2>Player {username}'s turn</h2>
      <div>
        {gamePlayers.map(p => (
          <h3>
            Score {p.name} {p.score}
          </h3>
        ))}
      </div>
      <Board board={gameBoard} handleClick={handleClick} />
      <div>
        <button onClick={handleReStart}>ReStart</button>
      </div>
    </div>
  );
};
export default Game;
