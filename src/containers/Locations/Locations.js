import React from 'react';
import { useEffect } from 'react';

const Locations = (props) => {
	useEffect(() => {
		props.setShowSubMenu(false);
	});

	return (
		<div>
			<h1>Locations Container</h1>
		</div>
	);
};

export default Locations;
