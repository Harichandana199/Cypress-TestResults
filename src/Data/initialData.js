const initialData = {
	tickets: {

		'ticket-1': {
			id: 'ticket-1',
			title: 'Watch my fav show',
			status: 'InProgress',
			completed: false,
		},
		'ticket-2': {
			id: 'ticket-2',
			title: 'Charge my phone',
			status: 'InProgress',
			completed: false,
		},
		'ticket-3': {
			id: 'ticket-3',
			title: 'Cook dinner',
			status: 'InProgress',
			completed: false,
		},
	},
	columns: {
		InProgress: {
			id: 'InProgress',
			title: 'InProgress',
			ticketIds: ['ticket-1', 'ticket-2', 'ticket-3'],
		},
		Done: { id: 'Done', title: 'Done', ticketIds: [] },
		Close: { id: 'Close', title: 'Close', ticketIds: [] },
	},
	columnOrder: ['InProgress', 'Done', 'Close'],
};

export default initialData;
