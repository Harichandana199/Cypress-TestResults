import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Col, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import PropTypes from 'prop-types';
import { addTicket } from '../Actions/changeOrder';

class AddTicket extends Component {
	state = {
		title: null,
		adding: false,
	};

	handleChange = (event) => {
		var title = event.target.value;
		this.setState({ title: title });
	};

	handleSubmit = (event) => {
		event.preventDefault();
		this.setState({ adding: true });
		const timer = setTimeout(() => {
			var currLen = Object.keys(this.props.State.tickets).length;
			var id = 'ticket-' + (currLen + 1);
			const newTicket = {
				id: id,
				title: this.state.title,
				status: 'InProgress',
				completed: false,
			};
			const newTicketIds = this.props.State.columns.InProgress.ticketIds;
			newTicketIds.push(id);
			this.props.addTicket(newTicket, newTicketIds);
      	this.setState({ adding: false });
    }, 1000);
    event.target.title.value = '';
		return () => clearTimeout(timer);
	};

	render() {
		return (
			<Container className="my-4">
				<Form onSubmit={this.handleSubmit}>
					<Form.Row className="align-items-center">
						<Form.Label column md={3} className="text-right">
							Add Tickets:
						</Form.Label>
						<Col md={6} sm={12}>
							<Form.Control
								type="text"
								placeholder="Add new ticket"
								onChange={this.handleChange.bind(this)}
								name="title"
							/>
						</Col>
						<Col>
							<Button type="submit" disabled={this.state.adding}>
								{this.state.adding ? (
									<React.Fragment>
										...
										<FontAwesomeIcon
											icon={faSpinner}
											spin={true}
											className="ml-2"
										/>
									</React.Fragment>
								) : (
									'Add'
								)}
							</Button>
						</Col>
					</Form.Row>
				</Form>
			</Container>
		);
	}
}

AddTicket.propTypes = {
	State: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	State: state,
});

export default connect(mapStateToProps, { addTicket })(AddTicket);
