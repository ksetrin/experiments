import {useState, useMemo, FormEvent} from 'react';
import {useDispatch} from 'react-redux';
import {setNames, setup} from '../store/actions';

const Players = () => {
  const dispatch = useDispatch();
  const [players, setPlayers] = useState(['', '']);
  const handleInput = (index: number) => (event: FormEvent<HTMLInputElement>) => {
    setPlayers(players.map((value: string, i: number) => (i === index ? event.currentTarget.value : value)));
  };
  const isValid = useMemo(() => players.every(player => player && player.length > 0), [players]);
  const handleStart = () => {
    dispatch(setNames(players));
    dispatch(setup());
  };

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <div>
        <label htmlFor="player1">Player 1</label>
        <input type="text" value={players[0]} onInput={handleInput(0)} />
      </div>
      <div>
        <label htmlFor="player2">Player 2</label>
        <input type="text" value={players[1]} onInput={handleInput(1)} />
      </div>
      <div>
        <button onClick={handleStart} disabled={!isValid}>
          Start
        </button>
      </div>
    </div>
  );
};
export default Players;
