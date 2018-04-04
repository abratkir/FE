import { ADD_ARTICLE, DELETE_ARTICLE } from "../constants/action-types";
export const addArticle = article => ({ type: ADD_ARTICLE, payload: article });
export const deleteArticle = articleId => ({ type: DELETE_ARTICLE, payload: articleId });