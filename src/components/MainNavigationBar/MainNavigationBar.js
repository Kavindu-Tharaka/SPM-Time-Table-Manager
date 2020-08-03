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

import './MainNavigationBar.css';

const MainNavigationBar = (props) => {
	const iconSize = '24px';
	const iconColor = '#fff';

	return (
		<div className='mnb-nav-container'>
			<Link to='/working-time'>
				<div className='mnb-nav-link-container'>
					<FaRegCalendarAlt
						size={`${iconSize}`}
						color={`${iconColor}`}
					/>
					<p className='mnb-nav-link-text'>Working Time</p>
				</div>
			</Link>

			<Link to='/lecturers'>
				<div className='mnb-nav-link-container'>
					<FaChalkboardTeacher
						size={`${iconSize}`}
						color={`${iconColor}`}
					/>
					<p className='mnb-nav-link-text'>Lecturers</p>
				</div>
			</Link>

			<Link to='/subjects'>
				<div className='mnb-nav-link-container'>
					<FaBook size={`${iconSize}`} color={`${iconColor}`} />
					<p className='mnb-nav-link-text'>Subjects</p>
				</div>
			</Link>

			<Link to='/student-groups'>
				<div className='mnb-nav-link-container'>
					<FaUserFriends
						size={`${iconSize}`}
						color={`${iconColor}`}
					/>
					<p className='mnb-nav-link-text'>Student Groups</p>
				</div>
			</Link>

			<Link to='/tags'>
				<div className='mnb-nav-link-container'>
					<FaTags size={`${iconSize}`} color={`${iconColor}`} />
					<p className='mnb-nav-link-text'>Tags</p>
				</div>
			</Link>

			<Link to='/locations'>
				<div className='mnb-nav-link-container'>
					<FaBuilding size={`${iconSize}`} color={`${iconColor}`} />
					<p className='mnb-nav-link-text'>Locations</p>
				</div>
			</Link>

			<Link to='/sessions'>
				<div className='mnb-nav-link-container'>
					<FaClock size={`${iconSize}`} color={`${iconColor}`} />
					<p className='mnb-nav-link-text'>Sessions</p>
				</div>
			</Link>

			<Link to='/working-time'>
				<div className='mnb-nav-link-container'>
					<FaExclamationTriangle
						size={`${iconSize}`}
						color={`${iconColor}`}
					/>
					<p className='mnb-nav-link-text'>Constraints</p>
				</div>
			</Link>

			<Link to='/statistics'>
				<div className='mnb-nav-link-container'>
					<FaChartPie size={`${iconSize}`} color={`${iconColor}`} />
					<p className='mnb-nav-link-text'>Statistics</p>
				</div>
			</Link>

			<Link to='/timetables'>
				<div className='mnb-nav-link-container'>
					<FaTh size={`${iconSize}`} color={`${iconColor}`} />
					<p className='mnb-nav-link-text'>Timetables</p>
				</div>
			</Link>
		</div>
	);
};

export default MainNavigationBar;
