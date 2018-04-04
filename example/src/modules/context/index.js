import React from "react";
import ArticleTable from "./ArticleTable";
import Form from "./Form";
import {ArticleContext} from "./ArticleContext";


function removeFromArray(array, index) {
	if (array.length > index) {
		if (array.length === index) {
			return [];
		} else {
			if (index === 0) {
				return array.slice(1, array.length);
			} else {
				var result = array.slice(0, index);
				return result.concat(array.slice(index+1));
			}
		}
	}
	throw 'Index out of bound';
}


class ContextTest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			articles: []
		}
		this.articleReducer = this.articleReducer.bind(this);
	}
	
	articleReducer(action) {
		var newState = {};
		switch (action.type) {
			case "ADD_ARTICLE":
				newState = {articles: this.state.articles.concat(action.payload)};
				break;
			case "DELETE_ARTICLE":
				newState = {articles: removeFromArray(this.state.articles, action.payload)};
				break;
			default:
				newState = {articles: this.state.articles};
				break;
		}
		this.setState(newState);
	};

	render() {
		let value = {articles: this.state.articles, actions: this.articleReducer};
		return (
			<ArticleContext.Provider value={value}>
				<div className="flex-row row-inline-block container justify-content-start m-0 p-0">
					<div className="col col-md-auto left-max-p left-min-r m-0 p-0 text-center">
						<h2>Articles</h2>
						<ArticleContext.Consumer>
						{ ac => (<ArticleTable data={ac.articles}/>) }
						</ArticleContext.Consumer>
					</div>
					<div className="col justify-content-center left-max-p left-min-r text-center">
						<h3>Add a new article</h3>
						<ArticleContext.Consumer>
						{ ac => (<Form action={ac.actions}/>) }
						</ArticleContext.Consumer>
					</div>
				</div>
			</ArticleContext.Provider>
		);
	}
}

export default ContextTest;