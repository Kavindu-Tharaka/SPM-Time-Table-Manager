import React from 'react';
import { Link } from 'react-router-dom';

import './subNavigationBar.css';
import { useState } from 'react';
import { useEffect } from 'react';

const SubNavigationBar = (props) => {
	let url = window.location.href;
	const [selectedMenu, setSelectedMenu] = useState('lecturers');

	useEffect(() => {
		setSelectedMenu(url.substring(url.lastIndexOf('/') + 1));
	}, [url]);

	return (
		<div className='snb-nav-container'>
			<div className='snb-nav-header'>
				<p>{props.header}</p>
			</div>
			<div className='snb-nav-content'>
				{props.links.map((link) => {
					return (
						<Link to={link.url} key={link.name}>
							<p
								className={
									selectedMenu === link.id
										? 'snb-nav-content-link-active'
										: null
								}
							>
								{link.name}
							</p>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default SubNavigationBar;
