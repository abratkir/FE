import React from 'react'
import { connect } from "react-redux";
import { deleteArticle } from "../actions/index";

const mapDispatchToProps = dispatch => {
  return {
    deleteArticle: articleId => dispatch(deleteArticle(articleId))
  };
};

class ConnectedButton extends React.Component {
	
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick(event) {
    event.preventDefault();
		this.props.deleteArticle(Number(event.target.value));
	}
	
  render() {
		return (
			<button key={this.props.value} value={this.props.value} type="submit" className="btn btn-danger btn-sm" onClick={this.handleClick}>
				<img src="./icons/trash.png"/>
			</button>
		)
	}
}

const Button = connect(null, mapDispatchToProps)(ConnectedButton);

class ArticleTable extends React.Component {
	
	parseData(data) {
		return (
			data.map((article, index) => {
				return (
					<tr key={index}>
						<th scope="row" className="align-middle">{index+1}</th>
						<td className="text-capitalize align-middle break-word">{article.title}</td>
						<td className="align-middle">
							<Button value={index} />
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