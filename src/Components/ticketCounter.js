import React from 'react';
const TicketCounter = (props) => {
	return (
		<span className="text-right">
			{props.countLabel ? props.countLabel : 'Count'}:{' '}
			<strong>{props.count}</strong>{' '}
		</span>
	);
};

export default TicketCounter;
