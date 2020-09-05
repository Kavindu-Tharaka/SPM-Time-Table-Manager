import React from 'react';
import { Link } from 'react-router-dom';

import {
	FaRegCalendarAlt,
	FaChalkboardTeacher,
	FaUserFriends,
	FaChartPie,
	FaTh,
	FaBuilding,
	FaBook,
	FaTags,
	FaClock,
	FaExclamationTriangle,
} from 'react-icons/fa';

import './mainNavigationBar.css';

const MainNavigationBar = (props) => {
	const iconSize = '24px';
	const iconColor = '#fff';

	return (
		<div className='mnb-nav-container'>
			<Link to='/working-time'>
				<div
					className={`mnb-nav-link-container ${
						props.selectedMainLink === 'working-time'
							? 'mnb-nav-link-container-active'
							: null
					}`}
					onClick={() => props.setSelectedMainLink('working-time')}
				>
					<FaRegCalendarAlt
						size={`${iconSize}`}
						color={`${iconColor}`}
					/>
					<p className='mnb-nav-link-text'>Working Time</p>
				</div>
			</Link>

			<Link to='/lecturers'>
				<div
					className={`mnb-nav-link-container ${
						props.selectedMainLink === 'lecturers'
							? 'mnb-nav-link-container-active'
							: null
					}`}
					onClick={() => props.setSelectedMainLink('lecturers')}
				>
					<FaChalkboardTeacher
						size={`${iconSize}`}
						color={`${iconColor}`}
					/>
					<p className='mnb-nav-link-text'>Lecturers</p>
				</div>
			</Link>

			<Link to='/subjects'>
				<div
					className={`mnb-nav-link-container ${
						props.selectedMainLink === 'subjects'
							? 'mnb-nav-link-container-active'
							: null
					}`}
					onClick={() => props.setSelectedMainLink('subjects')}
				>
					<FaBook size={`${iconSize}`} color={`${iconColor}`} />
					<p className='mnb-nav-link-text'>Subjects</p>
				</div>
			</Link>

			<Link to='/student-groups/years-semesters'>
				<div
					className={`mnb-nav-link-container ${
						props.selectedMainLink === 'student-groups'
							? 'mnb-nav-link-container-active'
							: null
					}`}
					onClick={() => props.setSelectedMainLink('student-groups')}
				>
					<FaUserFriends
						size={`${iconSize}`}
						color={`${iconColor}`}
					/>
					<p className='mnb-nav-link-text'>Student Groups</p>
				</div>
			</Link>

			<Link to='/tags'>
				<div
					className={`mnb-nav-link-container ${
						props.selectedMainLink === 'tags'
							? 'mnb-nav-link-container-active'
							: null
					}`}
					onClick={() => props.setSelectedMainLink('tags')}
				>
					<FaTags size={`${iconSize}`} color={`${iconColor}`} />
					<p className='mnb-nav-link-text'>Tags</p>
				</div>
			</Link>

			<Link to='/locations'>
				<div
					className={`mnb-nav-link-container ${
						props.selectedMainLink === 'locations'
							? 'mnb-nav-link-container-active'
							: null
					}`}
					onClick={() => props.setSelectedMainLink('locations')}
				>
					<FaBuilding size={`${iconSize}`} color={`${iconColor}`} />
					<p className='mnb-nav-link-text'>Locations</p>
				</div>
			</Link>

			<Link to='/sessions'>
				<div
					className={`mnb-nav-link-container ${
						props.selectedMainLink === 'sessions'
							? 'mnb-nav-link-container-active'
							: null
					}`}
					onClick={() => props.setSelectedMainLink('sessions')}
				>
					<FaClock size={`${iconSize}`} color={`${iconColor}`} />
					<p className='mnb-nav-link-text'>Sessions</p>
				</div>
			</Link>

			<Link to='/constraints/lecturers'>
				<div
					className={`mnb-nav-link-container ${
						props.selectedMainLink === 'constraints'
							? 'mnb-nav-link-container-active'
							: null
					}`}
					onClick={() => props.setSelectedMainLink('constraints')}
				>
					<FaExclamationTriangle
						size={`${iconSize}`}
						color={`${iconColor}`}
					/>
					<p className='mnb-nav-link-text'>Constraints</p>
				</div>
			</Link>

			<Link to='/statistics/lecturers'>
				<div
					className={`mnb-nav-link-container ${
						props.selectedMainLink === 'statistics'
							? 'mnb-nav-link-container-active'
							: null
					}`}
					onClick={() => props.setSelectedMainLink('statistics')}
				>
					<FaChartPie size={`${iconSize}`} color={`${iconColor}`} />
					<p className='mnb-nav-link-text'>Statistics</p>
				</div>
			</Link>

			<Link to='/timetables'>
				<div
					className={`mnb-nav-link-container ${
						props.selectedMainLink === 'timetables'
							? 'mnb-nav-link-container-active'
							: null
					}`}
					onClick={() => props.setSelectedMainLink('timetables')}
				>
					<FaTh size={`${iconSize}`} color={`${iconColor}`} />
					<p className='mnb-nav-link-text'>Timetables</p>
				</div>
			</Link>
		</div>
	);
};

export default MainNavigationBar;
