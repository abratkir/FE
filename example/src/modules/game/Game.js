import React from 'react';
import '../../index.css';
import Board from './Board';
import calculateWinner from './Util';

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			history: [{
				squares: Array(9).fill(null),
				move: null
			}],
			stepNumber: 0,
			xIsCurrent: true,
			sortType: 'ASC'
		}
	}
	
	handleClick(i) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		if (squares[i] || (calculateWinner(squares) && calculateWinner(squares).who)) { 
			return;
		}
		squares[i] = this.state.xIsCurrent ? 'X' : 'O';
		this.setState({
			history: history.concat([{
				squares: squares,
				move: i
			}]),
			stepNumber: history.length,
			xIsCurrent: !this.state.xIsCurrent
		});
	}
	
	jumpTo(move) {
		this.setState({
			stepNumber: move,
			xIsCurrent: (move % 2) === 0
		});
	}
	
	getSortOrderForButton() {
		switch (this.state.sortType) {
			case 'ASC':
				return (a, b) => a.key > b.key;
			case 'DESC':
				return (a, b) => a.key < b.key;
			default:
				throw new Error('Not supported sort type ' + this.state.sortType);
		}
	}
	
	changeSort(type) {
		this.setState({sortType: type})
	}
	
	generateSortButton(type) {
		return (
				<button className="btn btn-outline-danger btn-sm" onClick={() => this.changeSort(type)}>
					Change sort to {type} 
				</button>
			);
	}
	
	generateHistoryButtons(history) {
		return ([].concat(history).map((step, move) => {
			const desc = move ? <div>Go to move <span className="badge badge-light">{move}</span></div> : 'Go to game start';
			const title = move ? 'Clicked square on [' + (1+(step.move-(step.move%3))/3) + ', ' + (1+step.move%3) + ']' : '';
			const formDesc = this.state.stepNumber === move ? <b>{desc}</b> : desc;
			return (
				<button title={title} key={move} type="button" className="btn btn-outline-success btn-sm btn-lg btn-block" onClick={() => this.jumpTo(move)}>
					{formDesc}
				</button>
			);
		}).sort(this.getSortOrderForButton()));
	}
	
	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.squares);
		
		let status;
		if (winner && winner.who) {
			status = 'Winner: ' + winner.who;
		} else {
			status = 'Current player: ' + (this.state.xIsCurrent ? 'X' : 'O');
		}
		
		const moves = this.generateHistoryButtons(history);
		
		const sortButton = (this.state.sortType === 'ASC' ? this.generateSortButton('DESC') : this.generateSortButton('ASC'));
		return (
			<div className="game">
				<div className="col col-md-auto left-min">
					<div className="row justify-content-center">
						{sortButton}
					</div>
					<div className="row mt-2 mb-2 justify-content-center">
						{status}
					</div>
					<Board 
						combination={winner ? winner.combination : null}
						boardSize={3}
						squares={current}
						onClick={(i) => this.handleClick(i)}
					/>
				</div>
				<div className="col col-md-auto">
					<div className="btn-group-vertical">
						{moves}
					</div>
				</div>
			</div>
		);
	}
}

export default Game;