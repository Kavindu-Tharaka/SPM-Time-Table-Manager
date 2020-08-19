import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContentHeader from '../ContentHeader/ContentHeader';
import EmptyDataPlaceholder from '../EmptyDataPlacehoder/EmptyDataPlaceholder';
import BuildingCards from '../BuildingCards/BuildingCards';

const LocationContent = (props) => {
	const [buildingName, setBuildingName] = useState('');

	const onBuildingNameChange = (e) => {
		setBuildingName(e.target.value);
	};

	const [buildings, setBuildings] = useState([]);

	const [updateComponent, setUpdateComponent] = useState(0);

	const refreshComponent = () => {
		setUpdateComponent(Math.random());
	};

	const onAddClick = (e) => {
		e.preventDefault();

		axios
			.post('http://localhost:8000/api/v1/buildings', { buildingName })
			.then((res) => {
				setBuildings([...buildings, res.data.data.building]);
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

			<br />
			<ContentHeader header='Rooms' label='All' />

			<div className='form-row'>
				<div className='form-group col-md-3'>
					<label>Building</label>
					<select className='br-0 form-control form-control'>
						{buildings.map((building) => {
							return (
								<option key={building._id} value={building._id}>
									{building.buildingName}
								</option>
							);
						})}
					</select>
				</div>
				<div className='form-group col-md-2'>
					<label>Room Name</label>
					<input
						type='text'
						className='form-control'
						placeholder='Room Name'
					/>
				</div>
				<div className='form-group col-md-1'>
					<label>Floor</label>
					<input
						type='number'
						className='form-control'
						placeholder='00'
					/>
				</div>
				<div className='form-group col-md-1'>
					<label>Capacity</label>
					<input
						type='number'
						className='form-control'
						placeholder='00'
					/>
				</div>
				<div className='form-group col-md-3'>
					<label>Room Type</label>
					<div className='mt-1'>
						<div className='custom-control custom-radio custom-control-inline'>
							<input
								type='radio'
								id='lecture-hall'
								name='room-type'
								className='custom-control-input'
							/>
							<label
								className='custom-control-label'
								htmlFor='lecture-hall'
							>
								Lecture Hall
							</label>
						</div>
						<div className='custom-control custom-radio custom-control-inline float-right'>
							<input
								type='radio'
								id='laboratory'
								name='room-type'
								className='custom-control-input'
							/>
							<label
								className='custom-control-label'
								htmlFor='laboratory'
							>
								Laboratory
							</label>
						</div>
					</div>
				</div>
				<div className='form-group col-md-2'>
					<button className='btn btn-primary float-right mt-4'>
						Add
					</button>
				</div>
			</div>
			<br />
			<EmptyDataPlaceholder message='Room list is currently empty' />
		</div>
	);
};

export default LocationContent;