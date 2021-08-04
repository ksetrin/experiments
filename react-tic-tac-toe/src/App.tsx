import React from 'react';
import Game from './pages/Game';
import Players from './pages/Players';
import './App.css';
import {useSelector} from 'react-redux';
import {gameReady} from './store/selectors';

const App = () => {
  const gameGameReady = useSelector(gameReady);
  return <div className="App">{gameGameReady ? <Game /> : <Players />}</div>;
};

export default App;
