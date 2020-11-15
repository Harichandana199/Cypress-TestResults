import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTicket } from '../Actions/changeOrder';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

class EditTicket extends Component {
	state = {
		title: '',
		status: '',
		loading: false,
		ticket: '',
		id: '',
		validated: false,
		updating: false,
		prevStatus: '',
	};
	componentDidMount() {
		const ticket =
			this.props.State.tickets &&
			this.props.State.tickets[this.props.match.params.id];
		if (ticket) {
			const ticketStatus = JSON.parse(
				localStorage.getItem('_ticketStatus')
			);
			const Status =
				ticketStatus && ticketStatus.id === this.props.match.params.id
					? ticketStatus.status
					: ticket.status;
			this.setState({
				ticket,
				title: ticket.title,
				newStatus: Status,
				prevStatus: Status, //Added to identify source and destination column
				id: ticket.id,
				completed: false,
			});
		}
	}
	updateTicketHandler = (e) => {
		e.preventDefault();
		this.setState({
			updating: true,
		});
		this.props.updateTicket({
			id: this.state.id,
			title: this.state.title,
			newStatus: this.state.newStatus,
			prevStatus: this.state.prevStatus,
		});
		this.setState({ validated: true });
		const timer = setTimeout(() => {
			this.setState({
				updating: false,
			});
			 this.props.history.push('/');
		}, 2500);
		return () => clearTimeout(timer);
	};
	handleTitleChange = (e) => {
		this.setState({
			title: e.target.value,
		});
	};
	handleStatusChange = (e) => {
		this.setState({
			newStatus: e.target.value,
		});
	};
	render() {
		console.log(this.state.updating);
		if (!this.state.ticket) {
			return <p>404</p>;
		}
		return (
			<Container>
				<Row className="justify-content-center">
					<Col sm={12} md={9} className="my-4">
						<Card>
							<Card.Body>
								<Card.Title>Update Ticket </Card.Title>
								<Form
									noValidate
									validated={this.state.validated}
									onSubmit={this.updateTicketHandler}
								>
									<Form.Group controlId="formBasicEmail">
										<Form.Label>Title</Form.Label>
										<Form.Control
											required
											type="text"
											placeholder="Enter Title"
											defaultValue={this.state.title}
											onChange={this.handleTitleChange}
										/>
										<Form.Control.Feedback>
											Looks good!
										</Form.Control.Feedback>
										<Form.Control.Feedback type="invalid">
											Please provide valid title.
										</Form.Control.Feedback>
									</Form.Group>
									<Form.Group controlId="exampleForm.SelectCustom">
										<Form.Label>Status</Form.Label>
										<Form.Control
											as="select"
											custom
											defaultValue={this.state.newStatus}
											onChange={this.handleStatusChange}
										>
											<option value="" disabled>
												Choose your option
											</option>
											<option value="InProgress">
												In Progress
											</option>
											<option value="Done">Done</option>
											<option value="Close">Close</option>
										</Form.Control>
									</Form.Group>
									<Button type="submit">
										{this.state.updating ? (
											<React.Fragment>
												Updating
												<FontAwesomeIcon
													icon={faSpinner}
													spin={true}
													className="ml-2"
												/>
											</React.Fragment>
										) : (
											'Update'
										)}
									</Button>

									<Link
										to="/"
										className="btn waves-effect waves-light card-button"
									>
										Back
									</Link>
								</Form>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		);
	}
}
const mapStateToProps = (state) => ({
	State: state,
});

export default connect(mapStateToProps, { updateTicket })(
	withRouter(EditTicket)
);
