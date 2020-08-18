import React, { useState } from 'react';
import ContentHeader from '../ContentHeader/ContentHeader';
import EmptyDataPlaceholder from '../EmptyDataPlacehoder/EmptyDataPlaceholder';
import BuildingCards from '../BuildingCards/BuildingCards';

const LocationContent = (props) => {
	const [buildingName, setBuildingName] = useState('');

	const onBuildingNameChange = (e) => {
		setBuildingName(e.target.value);
	};

	return (
		<div>
			<ContentHeader header='Buildings' />

			<div className='single-input-container d-flex'>
				<input
					type='text'
					className='form-control'
                    placeholder='Building Name'
                    onChange={onBuildingNameChange}
					value={buildingName}
				/>
				<button className='btn btn-primary form-element-left-margin'>
					Add
				</button>
			</div>

            <EmptyDataPlaceholder message='Building list is currently empty'/>

            <BuildingCards/>


			<br />
			<ContentHeader header='Rooms' label='All' />
		</div>
	);
};

export default LocationContent;
