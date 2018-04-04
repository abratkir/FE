import React from "react";
import List from "./List";
import Form from "./Form";

const App = () => (
	<div className="flex-row row-inline-block container justify-content-start m-0 p-0">
		<div className="col col-md-auto left-max-p left-min-r m-0 p-0 text-center">
			<h2>Articles</h2>
			<List />
    </div>
		<div className="col justify-content-center left-max-p left-min-r text-center">
      <h3>Add a new article</h3>
      <Form />
    </div>
  </div>
);
export default App;