import React, { Component } from "react";
import uuidv1 from "uuid";

class Form extends Component {
	
  constructor() {
    super();
    this.state = {
      title: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
	
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
	
  handleSubmit(event) {
    event.preventDefault();
    const { title } = this.state;
		if (title === "") {
			alert("Empty titile is not allowed");
		} else {
			const id = uuidv1();
			let action = {type: "ADD_ARTICLE", payload: { title, id }};
			this.props.action(action);
			this.setState({ title: "" });
		}
  }
	
  render() {
    const { title } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
					<div className="input-group mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text" id="basic-addon1">Title</span>
						</div>
						<textarea type="text" className="form-control" id="title" value={title} onChange={this.handleChange} />
					</div>
        </div>
        <button type="submit" className="btn btn-success">
          SAVE
        </button>
      </form>
    );
  }
	
}

export default Form;