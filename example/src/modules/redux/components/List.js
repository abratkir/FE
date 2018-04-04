import React from "react";
import { connect } from "react-redux";
import ArticleTable from "./ArticleTable";

const mapStateToProps = state => {
  return { articles: state.articles };
};

const ConnectedList = ({ articles }) => (
  <ArticleTable data={articles} />
);

const List = connect(mapStateToProps)(ConnectedList);

export default List;