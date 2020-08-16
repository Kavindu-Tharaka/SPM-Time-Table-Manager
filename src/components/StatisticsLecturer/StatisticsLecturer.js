import React from 'react';
import ContentHeader from '../ContentHeader/ContentHeader';

const StatisticsLecturer = (props) => {
	return (
		<div>
			<ContentHeader header='Lecturer Statistics' />
			<input type='text' className='tms-input'></input>
			<button className='tms-primary-btn'></button>
		</div>
	);
};

export default StatisticsLecturer;
