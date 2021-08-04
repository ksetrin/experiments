import {SET_NAMES, PLACE, SETUP, SET_PLAYER_TURN, SET_WINNER} from './actionTypes';

export const initialState = {
  players: [
    {name: '', token: 'X', score: 0},
    {name: '', token: 'O', score: 0},
  ],
  playerTurn: 0,
  gameReady: false,
  board: Array(9).fill(''),
  winner: '',
};

const mutations: any = {
  [SET_NAMES](state: any, {names}) {
    return {
      ...state,
      players: state.players.map((p, index) => ({...p, name: names[index]})),
    };
  },
  [SETUP](state: any, {}) {
    return {
      ...initialState,
      players: state.players,
      gameReady: true,
    };
  },
  [PLACE](state: any, {index}) {
    return {
      ...state,
      board: state.board.map((value, i) => (i === index ? state.players[state.playerTurn].token : value)),
    };
  },
  [SET_PLAYER_TURN](state: any, {playerTurn}) {
    return {
      ...state,
      playerTurn: playerTurn,
    };
  },
  [SET_WINNER](state: any, {winner}) {
    return {
      ...state,
      winner,
      players: state.players.map((p, index) => ({...p, score: winner === p.token ? p.score + 1 : p.score})),
    };
  },
};

export default (state = initialState, {type, ...other}: any) => {
  return type in mutations ? mutations[type](state, other) : state;
};
