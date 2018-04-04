import React from 'react';
import '../index.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { menu } from '../config.js'

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {sort: (m1, m2) => m1.order > m2.order}
	}
	
	generateMenuButtons(sort) {
		return (
			menu.sort(sort).map(
				(m, id) => {
					return (
						<Link to={m.url} key={id}>
							<button type="button" className="btn btn-primary mr-1">
								{m.displayName}
							</button>
						</Link>
					);
				}
			)
		);
	}
	
	generateRoute(sort) {
		return (
			menu.sort(sort).map(
				(m, id) => {
					if (m.isExact === true) {
						return (
							<Route key={id} exact path={m.url} component={m.component} />
						);
					} else {
						return (
							<Route key={id} path={m.url} component={m.component} />
						);
					}
				}
			)
		);
	}
	
  render() {
    return (
      <Router>
        <div>
					<div className="row mt-2 mb-4 game justify-content-center">
						<div className="btn-group" role="group">
							{this.generateMenuButtons(this.state.sort)}
						</div>
					</div>
					<div className="row justify-content-center">
						{this.generateRoute(this.state.sort)}
					</div>
        </div>
      </Router>
    );
  }
}

export default App;