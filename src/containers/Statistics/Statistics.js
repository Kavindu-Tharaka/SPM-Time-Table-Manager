import React, { Fragment } from 'react';
import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import SubNavLink from '../../models/SubNavLink';

// Components
import SubNavigationBar from '../../components/SubNavigationBar/SubNavigationBar';
import StatisticsLecturer from '../../components/StatisticsLecturer/StatisticsLecturer';
import StatisticsSubject from '../../components/StatisticsSubject/StatisticsSubject';
import StatisticsStudent from '../../components/StatisticsStudent/StatisticsStudent';

const Statistics = (props) => {
	const links = [
		new SubNavLink('Lecturers', '/statistics/lecturers', 'lecturers'),
		new SubNavLink('Students', '/statistics/students', 'students'),
		new SubNavLink('Subjects', '/statistics/subjects', 'subjects'),
	];

	useEffect(() => {
		props.setShowSubMenu(true);
	});

	return (
		<Fragment>
			<SubNavigationBar links={links} header='Statistics' />
			<Switch>
				<Route
					path='/statistics/lecturers'
					component={StatisticsLecturer}
				/>
				<Route
					path='/statistics/students'
					component={StatisticsStudent}
				/>
				<Route
					path='/statistics/subjects'
					component={StatisticsSubject}
				/>
			</Switch>
		</Fragment>
	);
};

export default Statistics;
