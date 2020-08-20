import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContentHeader from '../ContentHeader/ContentHeader';
import EmptyDataPlaceholder from '../EmptyDataPlacehoder/EmptyDataPlaceholder';
import BuildingCards from '../BuildingCards/BuildingCards';
import Rooms from '../Rooms/Rooms';

const LocationContent = (props) => {
	// Inputs
	const [buildingName, setBuildingName] = useState('');

	// DB data
	const [buildings, setBuildings] = useState([]);

	const [updateComponent, setUpdateComponent] = useState(0);

	const refreshComponent = () => {
		setUpdateComponent(Math.random());
	};

	const onBuildingNameChange = (e) => {
		setBuildingName(e.target.value);
	};

	const onAddClick = (e) => {
		axios
			.post('http://localhost:8000/api/v1/buildings', { buildingName })
			.then((res) => {
				setBuildings([...buildings, res.data.data.building]);
				setBuildingName('');
			})
			.catch((err) => {
				console.log(err.response);
			});
	};

	useEffect(() => {
		axios
			.get('http://localhost:8000/api/v1/buildings')
			.then((res) => {
				setBuildings(res.data.data.buildings);
			})
			.catch((err) => {
				console.log(err.response);
			});
	}, [updateComponent]);

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
				<button
					className='btn btn-primary form-element-left-margin'
					onClick={onAddClick}
				>
					Add
				</button>
			</div>
			{buildings.length === 0 ? (
				<EmptyDataPlaceholder message='Building list is currently empty' />
			) : (
				<BuildingCards
					buildings={buildings}
					refreshComponent={refreshComponent}
				/>
			)}
			<br /> <br />
			<Rooms />
		</div>
	);
};

export default LocationContent;