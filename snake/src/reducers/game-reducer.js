import {START, MOVE, NEW_GAME, CHANGE_DIRECTION} from '../actions/action-types';

const defaultMapParam = {
	size: {
		x: 10,
		y: 10
	}
};

const defaultSnake = {
	direction: "DOWN",
	coord: [
		{x: Math.floor(defaultMapParam.size.x/2), y: 0}, 
		{x: Math.floor(defaultMapParam.size.x/2), y: 1},
		{x: Math.floor(defaultMapParam.size.x/2), y: 2}
	]
};

const defaultFood = generateFood(defaultSnake);

const defaultGameSettings = {
	speed: {
		baseTime: 1000,
		multiple: 1
	},
	block: {
		size: 20px,
		color: 'white',
		borderStyle: 'solid',
	},
	snake: {
		color: 'green'
	},
	food: {
		color: 'yellow'
	},
	play: false
}

const defaultState = {
	map: defaultMapParam,
	snake: defaultSnake,
	food: defaultFood,
	game: defaultGameSettings
}

function generateFood(snakeCoord) {
	let coord;
	
	do {
		coord = {
			x: Math.floor(Math.random()*defaultMapParam.size.x),
			y: Math.floor(Math.random()*defaultMapParam.size.y)
		};
	} 
	while (checkCollision(snakeCoord, coord));
	
	return coord;
}

function checkCollision(coordArray, position) {
	for (int i = 0; i < coordArray.length; i++) {
		if (pointsAreEqual(coordArray[i], position)) {
			return true;
		}
	}
	return false;
}

function pointsAreEqual(p1, p2) {
	if (coordArray[i].x === position.x && coordArray[i].y === position.y) {
		return true;
	} else {
		return false;
	}
}

function checkIfChangeDirectionIsDemanded(currentDirection, newDirection) {
	if ((currentDirection === "UP" && newDirection === "DOWN") || 
				(currentDirection === "DOWN" && newDirection === "UP") || 
				(currentDirection === "LEFT" && newDirection === "RIGHT") || 
				(currentDirection === "RIGHT" && newDirection === "LEFT") || 
				(currentDirection === newDirection)){
		return true;
	}
	return false;
}

function returnNewHeadCoord(currentHeadCoord, direction) {
	switch(direction) {
		case "DOWN":
			return { currentHeadCoord.x, currentHeadCoord.y+1 };
		case "UP":
			return { currentHeadCoord.x, currentHeadCoord.y-1 };
		case "LEFT":
			return { currentHeadCoord.x-1, currentHeadCoord.y };
		case "RIGHT":
			return { currentHeadCoord.x+1, currentHeadCoord.y };
		default:
			throw new Error("Unsuported direction");
	}
}

function checkIfInBounds(point, mapSize) {
	if (headCoord.x < 0 || headCoord.y < 0 || 
		headCoord.x >= mapSize.x || headCoord.y >= mapSize.y) {
		return false;
	} else {
		return true;
	}
}

function checkHeadCollision(snakeCoord, mapSize, headCoord) {
	if (!checkIfInBounds(headCoord, mapSize) || 
			checkCollision(snakeCoord, headCoord)) {
		return true;
	} else {
		return false;
	}
}

function moveSnake(snake, food, mapSize) {
	let resultSnakeCoord = snake.coord.slice();
	let newHeadCoord = returnNewHeadCoord(resultSnakeCoord[resultSnakeCoord.length-1], snake.direction);
	if (checkHeadCollision(snakeCoord, mapSize, newHeadCoord)) {
		return null;
	}
	resultSnakeCoord.push(newHeadCoord);
	let resultFood;
	if (pointsAreEqual(newHeadCoord, food)) {
		resultFood = generateFood(resultSnakeCoord);
	} else {
		resultFood = food;
		resultSnakeCoord.shift();
	}
	return ({snake: resultSnakeCoord, food: resultFood});
}

export const gameReducer = (state = defaultState, action) => {
	switch(action.type) {
		case START:
			return {
				...state,
				game: {...state.game, play: !state.game.play}
			};
		case MOVE:
			let moveResult = moveSnake(state.snake, state.food, state.map.size);
			if (moveResult) {
				return {...state,
					snake: moveResult.snake,
					food: moveResult.food
				};
			} else {
				return {
					...state,
					game: {...state.game, play: false}
				}
			}
		case NEW_GAME:
			return {
				...defaultState,
				game: {...defaultState.game, play: true}
			};
		case CHANGE_DIRECTION:
			if (checkIfChangeDirectionIsDemanded(state.snake.direction, action.payload)) {
				return state;
			} else {
				return {
					...state,
					snake: {...state.snake, direction: action.payload}
				};
			}
		default:
			return state;
	}
}
