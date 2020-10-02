import { Switch, Route } from 'react-router-dom';
import React from 'react';
import { useEffect } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

// Component
import AssignForTags from '../../components/AssignRooms/AssignForTags';
import LocationContent from '../../components/LocationContent/LocationContent';
import SubNavigationBar from '../../components/SubNavigationBar/SubNavigationBar';
import SubNavLink from '../../models/SubNavLink';
import AssignForSubjects from '../../components/AssignRooms/AssignForSubjects';
import AssignForLecturers from '../../components/AssignRooms/AssignForLecturers';
import AssignForGroups from '../../components/AssignRooms/AssignForGroups';
import AssignForSessions from '../../components/AssignRooms/AssignForSessions';
import AssignForConsecutive from '../../components/AssignRooms/AssignForConsecutive';
import UnavailableTimes from '../../components/AssignRooms/UnavailableTimes';

const Locations = (props) => {
	const links = [
		new SubNavLink(
			'Buildings & Rooms',
			'/locations/locations-content',
			'locations-content'
		),
		new SubNavLink(
			'Assign for Tags',
			'/locations/assign-for-tags',
			'assign-for-tags'
		),
		new SubNavLink(
			'Assign for Subjects',
			'/locations/assign-for-subjects',
			'assign-for-subjects'
		),
		new SubNavLink(
			'Assign for Lecturers',
			'/locations/assign-for-lecturers',
			'assign-for-lecturers'
		),
		new SubNavLink(
			'Assign for Groups',
			'/locations/assign-for-groups',
			'assign-for-groups'
		),
		new SubNavLink(
			'Assign for Sessions',
			'/locations/assign-for-sessions',
			'assign-for-sessions'
		),
		new SubNavLink(
			'Unavailable Times',
			'/locations/unavailable-times',
			'unavailable-times'
		),
	];

	useEffect(() => {
		props.setShowSubMenu(true);
	});

	return (
		<DndProvider backend={HTML5Backend}>
			<SubNavigationBar links={links} header='Locations' />

			<Switch>
				<Route
					path='/locations/assign-for-tags'
					component={AssignForTags}
				/>
				<Route
					path='/locations/assign-for-subjects'
					component={AssignForSubjects}
				/>
				<Route
					path='/locations/assign-for-lecturers'
					component={AssignForLecturers}
				/>
				<Route
					path='/locations/assign-for-groups'
					component={AssignForGroups}
				/>
				<Route
					path='/locations/assign-for-sessions'
					component={AssignForSessions}
				/>
				<Route
					path='/locations/assign-for-consecutive'
					component={AssignForConsecutive}
				/>
				<Route
					path='/locations/unavailable-times'
					component={UnavailableTimes}
				/>
				<Route path='/locations/' component={LocationContent} />
			</Switch>
		</DndProvider>
	);
};

export default Locations;
