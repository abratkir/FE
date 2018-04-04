import React from 'react';
import {ArticleContext} from "./ArticleContext";

class Button extends React.Component {
	
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick(event) {
    event.preventDefault();
		this.props.action({type: "DELETE_ARTICLE", payload: Number(event.target.value)});
	}
	
  render() {
		return (
			<button key={this.props.value} value={this.props.value} type="submit" className="btn btn-danger btn-sm" onClick={this.handleClick}>
				<img src="./icons/trash.png"/>
			</button>
		)
	}
}

class ArticleTable extends React.Component {
	
	parseData(data) {
		return (
			data.map((article, index) => {
				return (
					<tr key={index}>
						<th scope="row" className="align-middle">{index+1}</th>
						<td className="text-capitalize align-middle break-word">{article.title}</td>
						<td className="align-middle">
							<ArticleContext.Consumer>
							{ac => (<Button value={index} action={ac.actions} />) }
							</ArticleContext.Consumer>
						</td>
					</tr>
				);
				}
			)
		);
	}
	
	render() {
		let data = this.props && this.props.data && this.parseData(this.props.data);
		return (
			<table className="table table-striped table-hover table-sm table-bordered mr-5">	
				<thead className="table-secondary">
					<tr>
						<th scope="col">#</th>
						<th scope="col">Title</th>
						<th scope="col">Actions</th>
					</tr>
				</thead>
				<tbody>
					{data}
				</tbody>
			</table>
		);
	}
}

export default ArticleTable;