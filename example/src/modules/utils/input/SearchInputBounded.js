import React from 'react';

class SearchInputBounded extends React.Component {
	
	render() {
		return (
			<ul className="list-group">
				<li className="list-group-item">
					Number of records
				</li>
				<li className="list-group-item">
					<input type="number" min={this.props.range.bottom} max={this.props.range.upper} className="form-control input-sm" value={this.props.number} onChange={this.props.onChange}/>
				</li>
			</ul>
		);
	}
	
}

export default SearchInputBounded;