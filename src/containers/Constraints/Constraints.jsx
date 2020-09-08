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
import SubSubNavLink from '../../models/SubSubNavLink';

function Constraints(props) {
	const links = [
		new SubNavLink('Not Availabilities', '/constraints/lecturers', 'not-availabilities'),
		new SubNavLink('Consecutive Sessions', '/constraints/consecutive-sessions', 'consecutive-sessions'),
		new SubNavLink('Parallel Sessions', '/constraints/parallel-sessions', 'parallel-sessions'),
		new SubNavLink('Un-Overlap Sessions', '/constraints/un-overlap-sessions', 'un-overlap-sessions'),
	];

	const sublinks = [
		new SubSubNavLink('Lecturers', '/constraints/lecturers', 'lecturers'),
		new SubSubNavLink('Sessions', '/constraints/sessions', 'sessions'),
		new SubSubNavLink('Student Groups', '/constraints/groups', 'groups'),
		new SubSubNavLink('Student Sub-Groups', '/constraints/sub-groups', 'sub-groups'),
	];

	useEffect(() => {
		props.setShowSubMenu(true);
	});

	return (
		<Fragment>
			<SubNavigationBar links={links} sublinks={sublinks} header='Constraints' />
			<Switch>
				<Route
					path='/constraints/lecturers'
					component={ConstraintsLecturers}
				/>
				<Route
					path='/constraints/sessions'
					component={ConstraintsSessions}
				/>
				<Route
					path='/constraints/groups'
					component={ConstraintsGroups}
				/>
				<Route
					path='/constraints/sub-groups'
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
