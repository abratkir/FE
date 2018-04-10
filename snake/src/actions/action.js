import {START, MOVE, GENERATE_FOOD, NEW_GAME, LOSE_GAME, EAT_FOOD, CHANGE_DIRECTION} from './action-types';
export const startGame = () => {type: START};
export const makeMove = () => {type: MOVE};
export const newGame = () => {type: NEW_GAME};
export const changeDirection = (key) => {type: CHANGE_DIRECTION, payload: key};