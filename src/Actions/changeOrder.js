import * as types from './types';

export const orderChange = (newColumn,columnId) => dispatch => {
  //console.log("action creater");
  dispatch({
  type: types.TICKETREORDER,
  column:{
    columnId: columnId,
    newColumn: newColumn
  }
})};

export const columnChange = (newState) => dispatch => {
  dispatch({
  type: types.CHANGECOLUMN,
  newState: newState
})}

export const addTicket = (newTicket, newTicketIds) => dispatch => {dispatch({
  type: types.ADDTICKET,
  newTicket: newTicket,
  newTicketIds: newTicketIds
})}
export const updateTicket = (args) => (dispatch) => {
  console.log(args);
	dispatch({
		type: types.UPDATETICKET,
		ticketId: args.id,
		title: args.title,
		newStatus: args.newStatus,
		prevStatus: args.prevStatus,
	});
};
