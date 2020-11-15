import React, {Component} from 'react'
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Column from './column';
import {Container, Row, Col } from 'react-bootstrap';
import AddTicket from './addTicket';

import {orderChange, columnChange} from '../Actions/changeOrder';
class TicketBoard extends Component {
  constructor(props){
    super(props);
    this.state = this.props.State;

  }
  componentWillReceiveProps(nextProps){
    if(this.state !== nextProps){
      this.setState (nextProps.State);
    }
  }

  onDragStart = (start) => {
    // document.body.style.color = 'orange';

  }

  onDragEnd = (result) => {
    document.body.style.color = 'inherit';
    const {destination, source, draggableId} = result;
    if(!destination){
      return;
    }
    if(destination.droppableId === source.droppableId && destination.index === source.index){
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    //if change order
    if(start === finish){

      const newTicketIds = Array.from(start.ticketIds);
      newTicketIds.splice(source.index,1);
      newTicketIds.splice(destination.index,0,draggableId);

      const newColumn = {
        ...start,
        ticketIds: newTicketIds
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.columns,
          [source.droppableId]: newColumn
        }
      }
      this.setState(newState);
      this.props.orderChange(newColumn,source.droppableId);
      return;
    }
    const startTicketIds = Array.from(start.ticketIds);
    const finishTicketIds = Array.from(finish.ticketIds);
    startTicketIds.splice(source.index,1);
    finishTicketIds.splice(destination.index,0,draggableId);

    const newColumns = {
      ...this.state.columns,
      [source.droppableId]: {
        ...this.state.columns[source.droppableId],
        ticketIds: startTicketIds
      },
      [destination.droppableId]: {
        ...this.state.columns[destination.droppableId],
        ticketIds: finishTicketIds
      }
    }

    const newState = {
      ...this.state,
      columns: newColumns
    }

    this.setState(newState);
    this.props.columnChange(newState);
  }

  render(){
    return (
		<Container>
			<Row>
				<Col sm={12}>
					<AddTicket />
					<ul>
            <li>Drag and drop to change ticket status</li>
            <li>Click on edit icon to edit </li>
            <li>Ticket from 'Done' status will automatically move to 'Close' status after 5 seconds </li>
          </ul>
				</Col>
			</Row>
			<Row>
				<DragDropContext
					onDragStart={this.onDragStart}
					onDragEnd={this.onDragEnd}
				>
					{this.state.columnOrder.map((columnId) => {
						return (
							<Column
								key={columnId}
								columnId={columnId}
								State={this.state}
							/>
						);
					})}
				</DragDropContext>
			</Row>
		</Container>
	);
  }
}

TicketBoard.propTypes = {
  orderChange: PropTypes.func.isRequired,
  State: PropTypes.object.isRequired
}

const mapStateToProps=state=>({
  State: state,
})




export default connect(mapStateToProps, {orderChange,columnChange})(TicketBoard);
