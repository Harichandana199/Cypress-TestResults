import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateTicket } from '../Actions/changeOrder';

const Wrapper = styled.div`
	border: 1px solid lightgrey;
	border-radius: 2px;
	padding: 8px;
	margin-bottom: 8px;
	background-color: ${(props) => (props.isDragging ? 'lightgreen' : 'white')};
	display: flex;
	text-decoration: ${(props) => (props.droppableId==='Close' ? 'line-through' : 'normal')};
`;

const Ticket = (props) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = React.useState(true);

	//Remove localstorage initially
	localStorage.removeItem('_ticketStatus');
	const setClose = (ticketId) => {
		dispatch(
			updateTicket({
				id: ticketId,
				title: props.State.tickets[props.ticketId].title,
				newStatus: 'Close',
				prevStatus: 'Done',
			})
		);
	};
	const setNotFix = (ticketId) => {
		setIsLoading(false);
		dispatch(
			updateTicket({
				id: ticketId,
				title: props.State.tickets[props.ticketId].title,
				newStatus: 'InProgress',
				prevStatus: 'Done',
			})
		);
	};
	const setDone = (ticketId) => {
		dispatch(
			updateTicket({
				id: ticketId,
				title: props.State.tickets[props.ticketId].title,
				newStatus: 'Done',
				prevStatus: 'InProgress',
			})
		);
	};
	const editHandler = (ticketId, droppableId) => {
		//usefull when edit page /ticket:id refresh
		localStorage.setItem(
			'_ticketStatus',
			JSON.stringify({ status: droppableId, id: ticketId })
		);
		history.push({
			pathname: `/ticket/${props.ticketId}`,
			state: { ticketId: `${props.ticketId}` },
		});
	};
	React.useEffect(() => {
		if (props.droppableId === 'Done') {
			const timer = setTimeout(() => {
				if (isLoading){
					dispatch(
						updateTicket({
							id: props.ticketId,
							title: props.State.tickets[props.ticketId].title,
							newStatus: 'Close',
							prevStatus: 'Done',
						})
					);
				}else{
					console.log('stopped');
				}

			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [isLoading]);
	return (
		<Draggable draggableId={props.ticketId} index={props.index}>
			{(provided, snapshot) => (
				<Wrapper
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					isDragging={snapshot.isDragging}
					droppableId={props.droppableId}
					className="d-block text-center py-4"
				>
					<p className="text-right">
						<Button
							variant="link"
							onClick={() =>
								editHandler(props.ticketId, props.droppableId)
							}
						>
							<FontAwesomeIcon icon={faEdit} />
						</Button>
					</p>
					<p className="font-weight-bold">
						{props.State.tickets[props.ticketId].title}
					</p>
					<hr />
					{props.droppableId === 'InProgress' && (
						<React.Fragment>
							<Button
								className="mr-4"
								onClick={() => setDone(props.ticketId)}
							>
								Done
							</Button>
							<Button onClick={() => setClose(props.ticketId)}>
								Close
							</Button>
						</React.Fragment>
					)}
					{props.droppableId === 'Done' && (
						<React.Fragment>
							<Button
								className="mr-4"
								onClick={() => setNotFix(props.ticketId)}
							>
								Not Fix
							</Button>
							<Button onClick={() => setClose(props.ticketId)}>
								Close
							</Button>
						</React.Fragment>
					)}
				</Wrapper>
			)}
		</Draggable>
	);
};

Ticket.propTypes = {
	State: PropTypes.object.isRequired,
};

export default Ticket;
