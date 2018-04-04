import { ADD_ARTICLE, DELETE_ARTICLE } from "../constants/action-types";

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