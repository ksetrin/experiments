import {SET_NAMES, PLACE, SETUP, SET_PLAYER_TURN, SET_WINNER} from './actionTypes';
import {calculateWinner} from './utils';
export const setNames = (names: string[]) => {
  return {
    type: SET_NAMES,
    names,
  };
};

export const setup = () => {
  return {
    type: SETUP,
  };
};

export const setPlayerTurn = (playerIndex: number) => {
  return {
    type: SET_PLAYER_TURN,
    playerTurn: playerIndex,
  };
};

export const place = (index: number) => {
  return {
    type: PLACE,
    index: index,
  };
};

export function setWinner(winner: string) {
  return {
    type: SET_WINNER,
    winner,
  };
}

export const placeAndProceed = (index: number) => (dispatch: any, getState: any) => {
  dispatch(place(index));
  const winner = calculateWinner(getState().board);
  if (winner) {
    return dispatch(setWinner(winner));
  }
  const openSquares = getState().board.filter((square: any) => !square);
  if (openSquares.length > 0) {
    return dispatch(nextPlayer());
  } else {
    return dispatch(setWinner('-'));
  }
};

export const nextPlayer = () => (dispatch: any, getState: any) => {
  const {playerTurn, players} = getState();
  const nextPlayer = (playerTurn + 1) % players.length;
  dispatch(setPlayerTurn(nextPlayer));
};
