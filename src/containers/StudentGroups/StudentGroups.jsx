import React, { Fragment } from 'react';
import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import SubNavLink from '../../models/SubNavLink';
import SubNavigationBar from '../../components/SubNavigationBar/SubNavigationBar';
import StudentGroupsSubGroupIDs from '../../components/StudentGroupsSubGroupIDs/StudentGroupsSubGroupIDs';
import StudentGroupsGroupIDs from '../../components/StudentGroupsGroupIDs/StudentGroupsGroupIDs';
import StudentGroupsSpecializations from '../../components/StudentGroupsSpecializations/StudentGroupsSpecializations';
import StudentGroupsYearsSemesters from '../../components/StudentGroupsYearsSemesters/StudentGroupsYearsSemesters';
import StudentGroupsGroupSubGroupNumbers from '../../components/StudentGroupsGroupSubGroupNumbers/StudentGroupsGroupSubGroupNumbers';

function StudentGroups(props) {
	const links = [
		new SubNavLink('Years & Semesters', '/student-groups/years-semesters', 'yearsSemesters'),
		new SubNavLink('Specializations', '/student-groups/specializations', 'specializations'),
		new SubNavLink('Group & Sub-Group Numbers', '/student-groups/group-sub-group-numbers', 'groupNumbers'),
		new SubNavLink('Generate Group IDs', '/student-groups/group-ids', 'groupIds'),
		new SubNavLink('Generate Sub-Group IDs', '/student-groups/sub-group-ids', 'subgroupIds'),
	];

	useEffect(() => {
		props.setShowSubMenu(true);
	});

	return (
		<Fragment>
			<SubNavigationBar links={links} header='Student Groups' />
			<Switch>
				<Route
					path='/student-groups/years-semesters'
					component={StudentGroupsYearsSemesters}
				/>
				<Route
					path='/student-groups/specializations'
					component={StudentGroupsSpecializations}
				/>
				<Route
					path='/student-groups/group-sub-group-numbers'
					component={StudentGroupsGroupSubGroupNumbers}
				/>
				<Route
					path='/student-groups/group-ids'
					component={StudentGroupsGroupIDs}
				/>
				<Route
					path='/student-groups/sub-group-ids'
					component={StudentGroupsSubGroupIDs}
				/>
			</Switch>
		</Fragment>
	);
}

export default StudentGroups
