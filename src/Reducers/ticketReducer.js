import initialData from '../Data/initialData';
import * as types from '../Actions/types';

const initialState = initialData;

export default function (state = initialState, action) {
	switch (action.type) {
		case types.TICKETREORDER: {
			console.log('ticket order');
			const newState = {
				...state,
				columns: {
					...state.columns,
					[action.column.columnId]: {
						...state.columns.Ticket,
						ticketIds: action.column.newColumn.ticketIds.map(
							(ticketId) => {
								return ticketId;
							}
						),
					},
				},
			};
			return newState;
		}

		case types.CHANGECOLUMN: {
			console.log('change column');
			return action.newState;
		}
		case types.UPDATETICKET: {
			const { columns } = state;
			let newColumns = {};
			let prevStatusColumn = columns[action.prevStatus];
			let newStatusColumn = columns[action.newStatus];
			if (prevStatusColumn !== newStatusColumn) {
				const oldTicketIds = prevStatusColumn.ticketIds.filter(
					(item) => item !== action.ticketId
				);
				newStatusColumn.ticketIds.push(action.ticketId);
				newColumns = {
					...state.columns,
					[action.prevStatus]: {
						...state.columns[action.prevStatus],
						ticketIds: oldTicketIds,
					},
					[action.newStatus]: {
						...state.columns[action.newStatus],
						ticketIds: newStatusColumn.ticketIds,
					},
				};
			} else {
				newColumns = {
					...state.columns,
				};
			}

			const newState = {
				...state,
				tickets: {
					...state.tickets,
					[action.ticketId]: {
						id: action.ticketId,
						title: action.title,
						status: action.status,
					},
				},
				columns: newColumns,
			};

			return newState;
		}

		case types.ADDTICKET: {
			const newState = {
				...state,
				tickets: {
					...state.tickets,
					[action.newTicket.id]: action.newTicket,
				},
				columns: {
					...state.columns,
					Ticket: {
						...state.columns.Ticket,
						ticketIds: action.newTicketIds,
					},
				},
			};
			return newState;
		}

		default:
			return state;
	}
}
