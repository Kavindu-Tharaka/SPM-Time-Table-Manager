import React, { Fragment } from 'react';
import { useEffect } from 'react';
import LocationContent from '../../components/LocationContent/LocationContent';

const Locations = (props) => {
	useEffect(() => {
		props.setShowSubMenu(false);
	});

	return (
		<Fragment>
			<LocationContent/>
		</Fragment>
	);
};

export default Locations;
