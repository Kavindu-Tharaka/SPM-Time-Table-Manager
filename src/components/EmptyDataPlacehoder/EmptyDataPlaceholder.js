import React from 'react';

import './emptyDataPlaceholder.css'

const EmptyDataPlaceholder = (props) => {
	return (
		<div className='edp-placeholder-container'>
            <img src="https://i.ibb.co/dKLPTzJ/emptybook.png" alt="emptyBook" border="0" />
			<p>{props.message}</p>
		</div>
	);
};

export default EmptyDataPlaceholder;
