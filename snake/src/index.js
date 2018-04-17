import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import Snake from './snake';


ReactDOM.render(
	<Provider store={store}>
		<Snake />
	</Provider>,
	document.getElementById("root")
);

