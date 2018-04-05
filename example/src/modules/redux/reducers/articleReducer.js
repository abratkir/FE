import { ADD_ARTICLE, DELETE_ARTICLE } from "../constants/action-types";
import {removeFromArray} from "../../utils/util";

const articleReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_ARTICLE:
      return [...state, action.payload];
		case DELETE_ARTICLE:
			return removeFromArray(state, action.payload);
    default:
      return state;
  }
};

export default articleReducer;