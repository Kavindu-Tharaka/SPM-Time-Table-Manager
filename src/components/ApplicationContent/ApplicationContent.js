import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useState } from 'react';

//components
import Statistics from '../../containers/Statistics/Statistics';
import Locations from '../../containers/Locations/Locations';

import './applicationContent.css';

const ApplicationContent = (props) => {
	const [showSubMenu, setShowSubMenu] = useState(false);

	return (
		<div
			className={
				showSubMenu
					? 'ac-main-container-with-side-menu'
					: 'ac-main-container-without-side-menu'
			}
		>
			<Switch>
				<Route
					path='/locations'
					component={() => (
						<Locations setShowSubMenu={setShowSubMenu} />
					)}
				/>
				<Route
					path='/statistics'
					component={() => (
						<Statistics setShowSubMenu={setShowSubMenu} />
					)}
				/>
			</Switch>
		</div>
	);
};

export default ApplicationContent;
