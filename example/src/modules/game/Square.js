import React from 'react';
import '../../index.css';

class Square extends React.Component {
	
	render () {
		var bcgCol = this.props.highlight ? '#40FF00' : 'white';
		return (
			<button type="button" className="btn btn-light square" style={{backgroundColor : bcgCol}} onClick={this.props.onClick} >
				{this.props.value}
			</button>
		);
	}
}

export default Square;