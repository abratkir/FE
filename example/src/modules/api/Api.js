import React from 'react';
import axios from 'axios';
import {testApiUrl as URL} from '../../config.js';
import ChunkTable from './ChunkTable';
import SearchButton from './SearchButton';

class Api extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			persons: this.getData(1),
			number: 1,
			spinner: true
		}
	}
	
	getData(number) {
		axios.get(URL + number)
			.then(res => {
				this.setState({ persons: res.data.results, spinner: false });
			}
		);
	}
	
	updateNumber(event) {
		if (event.target.value && event.target.value !== this.state.number) {
			this.setState({number: event.target.value, spinner: true});
			this.getData(event.target.value);
		}
	}
	
	render() {
		let configuration = [
			{name: "First", className: "text-capitalize align-middle", order: 1, path: "name.first", isImg: false, isSort: true},
			{name: "Last", className: "text-capitalize align-middle", order: 2, path: "name.last", isImg: false, isSort: true},
			{name: "Gender", className: "align-middle", order: 3, path: "gender", isImg: false, isSort: true},
			{name: "User name", className: "align-middle", order: 4, path: "login.username", isImg: false, isSort: true},
			{name: "Picture", className: "align-middle", order: 5, path: "picture.thumbnail", isImg: true, isSort: false}
		];
		return (
			<div className="flex-row row-inline-block container justify-content-start m-0 p-0">
				<div className="col col-md-auto left-max left-min-c m-0 p-0">
					<SearchButton number={this.state.number} onChange={(event) => {this.updateNumber(event)}}/>
				</div>
				<div className="col justify-content-center text-center">
					<ChunkTable data={this.state.persons} spinner={this.state.spinner} conf={configuration}/>
				</div>
			</div>
		);
	}
}

export default Api;