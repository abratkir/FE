import React from 'react';
import {getDataFromObject} from '../../util';

const arrowDown = "./icons/arrow-bottom-2x.png";
const arrowUp = "./icons/arrow-top-2x.png";

class SortButton extends React.Component {
	
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick(event) {
		debugger;
    event.preventDefault();
		this.props.action(event.target.value, this.props.source === arrowDown ? "ASC" : "DESC");
	}
	
  render() {
		return (
			<button key={this.props.value} value={this.props.path} type="submit" className="btn btn-default btn-sm" onClick={this.handleClick}>
				<img src={this.props.source}/>
			</button>
		)
	}
	
}

class ChunkTable extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			sort: null
		}
		this.changeSort = this.changeSort.bind(this);
	}
	
	parseData(d, sort) {
		debugger;
		let data = sort ? d.sort(sort) : d;
		let sortedConf = this.props.conf.sort((a1, a2) => a1.order > a2.order);
		return (
			data.map((person, number) => {
				return (
					<tr key={number}>
						<th scope="row" className="align-middle">{number+1}</th>
						{ 
							sortedConf.map( c => { 
									let data = getDataFromObject(person, c.path);
									let child = c.isImg ? <img src={data} alt=""/> : data;
									return (<td className={c.className}>{child}</td>)
								} 
							)
						}
					</tr>
				);
				}
			)
		);
	}
	
	changeSort(path, sortOrder) {
		debugger;
		this.setState({
			sort: (a1, a2) => (
				sortOrder==="ASC" ? getDataFromObject(a1, path) > getDataFromObject(a2, path) :
					getDataFromObject(a1, path) < getDataFromObject(a2, path)
				)
			}
		)
	}
	
	render() {
		let data = this.props && this.props.data && !this.props.spinner && this.parseData(this.props.data, this.state.sort);
		let spinner = this.props.spinner ? "mx-auto d-block spinner" : "";
		return (
			<table className="table table-striped table-hover table-sm table-bordered mr-5">	
				<thead className="table-secondary">
					<tr>
						<th scope="col" className="align-middle text-center">#</th>
						{ 
							this.props.conf.sort((a1, a2) => a1.order > a2.order).map(
								c => {
									if (c.isSort) {
											return (
												<th scope="col" className="align-middle">
													<div className="flex-row justify-content-center align-middle">
														{c.name}{'  '}
														<SortButton path={c.path} source={arrowDown} action={this.changeSort}/>
														<SortButton path={c.path} source={arrowUp} action={this.changeSort}/>
													</div>
												</th>
											);
									} else {
										return (
											<th scope="col" className="align-middle">
												{c.name}
											</th>
										)
									}
								}
							)
						}
					</tr>
				</thead>
				<tbody className={spinner}>
					{data}
				</tbody>
			</table>
		);
	}
}

export default ChunkTable;