import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TicketBoard from './Components/ticketBoard';
import EditTicket from './Components/editTicket';
class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<Switch>
						<Route exact path="/" component={TicketBoard} />
						<Route
							exact
							path="/ticket/:id"
							component={EditTicket}
						/>
					</Switch>
				</Router>
			</Provider>
		);
	}
}

export default App;
