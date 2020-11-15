import React from 'react';
import styled from 'styled-components';
import {Droppable } from 'react-beautiful-dnd';
import { Card, Col } from 'react-bootstrap';

import PropTypes from 'prop-types';

import Ticket from './ticket';
import TicketCounter from './ticketCounter';

const TicketList = styled.div`
	padding: 8px;
	transition:background-color 0.2s ease;
	background-color: ${props => props.isDraggingOver? 'skyblue':'inherit'};
	flex-grow: 1;
	min-height: 100px;
`;


const Column =(props)=>{
    return (
		<Col sm={12} md={4}>
			<Card>
				<Card.Header className="d-flex justify-content-between">
					{props.State.columns[props.columnId].title}
					<TicketCounter
						count={props.State.columns[props.columnId].ticketIds.length}
					></TicketCounter>
				</Card.Header>

				<Droppable droppableId={props.columnId}>
					{(provided, snapshot) => (
						<TicketList
							{...provided.droppableProps}
							isDraggingOver={snapshot.isDraggingOver}
							ref={provided.innerRef}
						>
							{props.State.columns[props.columnId].ticketIds.map(
								(ticketId, index) => {
									return (
										<Ticket
											key={ticketId}
											ticketId={ticketId}
											index={index}
											State={props.State}
											droppableId={props.columnId}
										/>
									);
								}
							)}
							{provided.placeholder}
						</TicketList>
					)}
				</Droppable>
			</Card>
		</Col>
	);
  }


Column.propTypes = {
  State: PropTypes.object.isRequired
}



export default Column;
