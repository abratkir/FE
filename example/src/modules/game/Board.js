import React from 'react';
import Square from './Square'

class Board extends React.Component {
	
	renderSquare(i) {
		var isHighlight = (i === this.props.squares.move || 
		(this.props.combination && this.props.combination.indexOf(i) !== -1));
		return (
			<Square 
				highlight={isHighlight}
				key={i}
				value={this.props.squares.squares[i]}
				onClick={() => this.props.onClick(i)}
			/>
		);
	}

	helpRender(size) {
		var board = [];
		for (var i = 0; i < size; i++) {
			let children = [];
			for (var j = 0; j < size; j++) {
				let temp = j+size*i;
				children.push(this.renderSquare(temp));
			}
			board.push(<div className="btn-group" role="group" key={i}>{children}</div>);
		}
		return (
			<div className="row justify-content-center">
				<div className="btn-group-vertical">
					{board}
				</div>
			</div>
		);
	}
	
	render() {
		return this.helpRender(this.props.boardSize);
	}
}

export default Board;