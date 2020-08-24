import React, { Fragment } from 'react';
import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import SubNavLink from '../../models/SubNavLink';
import SubNavigationBar from '../../components/SubNavigationBar/SubNavigationBar';

import ConstraintsConsecutiveSessions from '../../components/ConstraintsConsecutiveSessions/ConstraintsConsecutiveSessions'
import ConstraintsParallelSessions from '../../components/ConstraintsParallelSessions/ConstraintsParallelSessions'
import ConstraintsUnOverlapSessions from '../../components/ConstraintsUnOverlapSessions/ConstraintsUnOverlapSessions'

import ConstraintsLecturers from '../../components/ConstraintsLecturers/ConstraintsLecturers'
import ConstraintsSessions from '../../components/ConstraintsSessions/ConstraintsSessions'
import ConstraintsGroups from '../../components/ConstraintsGroups/ConstraintsGroups'
import ConstraintsSubGroups from '../../components/ConstraintsSubGroups/ConstraintsSubGroups'

function Constraints(props) {
	const links = [
		new SubNavLink('Not Availabilities', '/constraints/not-availabilities/lecturers', 'notAvailabilities'),
		new SubNavLink('Consecutive Sessions', '/constraints/consecutive-sessions', 'consecutiveSessions'),
		new SubNavLink('Parallel Sessions', '/constraints/parallel-sessions', 'parallelSessions'),
		new SubNavLink('Un-Overlap Sessions', '/constraints/un-overlap-sessions', 'unOverlapSessions'),
	];

	useEffect(() => {
		props.setShowSubMenu(true);
	});

	return (
		<Fragment>
			<SubNavigationBar links={links} header='Constraints' />
			<Switch>
				<Route
					path='/constraints/not-availabilities/lecturers'
					component={ConstraintsLecturers}
				/>
				<Route
					path='/constraints/not-availabilities/sessions'
					component={ConstraintsSessions}
				/>
				<Route
					path='/constraints/not-availabilities/groups'
					component={ConstraintsGroups}
				/>
				<Route
					path='/constraints/not-availabilities/sub-groups'
					component={ConstraintsSubGroups}
				/>
				<Route
					path='/constraints/consecutive-sessions'
					component={ConstraintsConsecutiveSessions}
				/>
				<Route
					path='/constraints/parallel-sessions'
					component={ConstraintsParallelSessions}
				/>
				<Route
					path='/constraints/un-overlap-sessions'
					component={ConstraintsUnOverlapSessions}
				/>
			</Switch>
		</Fragment>
	);
}

export default Constraints
