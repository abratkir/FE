import React from 'react';
import axios from 'axios';
import {testApiUrl as URL} from '../../config.js';
import {tableConfig, searchRange, defaultSearchParam} from './config.js';
import SimpleTable from '../utils/table/SimpleTable';
import SearchInputBounded from '../utils/input/SearchInputBounded';

class Api extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			persons: [],
			number: defaultSearchParam,
			spinner: true
		}
	}
	
	componentDidMount() {
		this.getData(defaultSearchParam);
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
			if (Number(event.target.value) < searchRange.bottom || Number(event.target.value) > searchRange.upper) {
				this.setState({number: event.target.value, spinner: false});
				return;
			} else {
				this.setState({number: event.target.value, spinner: true});
				this.getData(event.target.value);
			}
		}
	}
	
	render() {
		
		return (
			<div className="flex-row row-inline-block container justify-content-start m-0 p-0">
				<div className="col col-md-auto left-max left-min-c m-0 p-0">
					<SearchInputBounded range={searchRange} number={this.state.number} onChange={(event) => {this.updateNumber(event)}}/>
				</div>
				<div className="col justify-content-center text-center">
					<SimpleTable data={this.state.persons} spinner={this.state.spinner} conf={tableConfig}/>
				</div>
			</div>
		);
	}
}

export default Api;