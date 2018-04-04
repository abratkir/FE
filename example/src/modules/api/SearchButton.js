import React from 'react';

class SearchButton extends React.Component {
	
	render() {
		return (
			<ul className="list-group">
				<li className="list-group-item">
					Number of records
				</li>
				<li className="list-group-item">
					<input type="number" className="form-control input-sm" value={this.props.number} onChange={this.props.onChange}/>
				</li>
			</ul>
		);
	}
	
}

export default SearchButton;