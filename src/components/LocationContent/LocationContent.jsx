import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContentHeader from '../ContentHeader/ContentHeader';
import EmptyDataPlaceholder from '../EmptyDataPlacehoder/EmptyDataPlaceholder';
import { FaSpinner } from 'react-icons/fa';
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';

import BuildingCards from '../BuildingCards/BuildingCards';
import Rooms from '../Rooms/Rooms';
import PreLoader from '../PreLoader/PreLoader';

const LocationContent = (props) => {
	// Inputs
	const [buildingName, setBuildingName] = useState('');

	// DB data
	const [buildings, setBuildings] = useState([]);

	const [updateComponent, setUpdateComponent] = useState(0);
	const [loading, setLoading] = useState(true);

	// Validation
	const [isBuildingNameValid, setIsBuildingNameValid] = useState(true);

	// Loading
	const [isAddingBuilding, setIsAddingBuilding] = useState(false);

	const refreshComponent = () => {
		setUpdateComponent(Math.random());
	};

	const onBuildingNameChange = (e) => {
		setBuildingName(e.target.value);
		setIsBuildingNameValid(true);
	};

	const onAddClick = (e) => {
		if (buildingName === '') {
			setIsBuildingNameValid(false);
			return;
		}

		setIsAddingBuilding(true);

		axios
			.post('http://localhost:8000/api/v1/buildings', { buildingName })
			.then((res) => {
				setBuildings([...buildings, res.data.data.building]);
				setIsAddingBuilding(false);
				setBuildingName('');
				store.addNotification(
					buildToast(
						'success',
						'Success',
						'Building Added Successfully'
					)
				);
			})
			.catch((err) => {
				console.log(err.response);
				setIsAddingBuilding(false);
			});
	};

	useEffect(() => {
		axios
			.get('http://localhost:8000/api/v1/buildings')
			.then((res) => {
				setBuildings(res.data.data.buildings);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err.response);
				setLoading(false);
			});
	}, [updateComponent]);

	return (
		<div>
			<PreLoader loading={loading} hasSideBar={false} />
			<ContentHeader header='Buildings' />
			<div className='single-input-container d-flex'>
				<div className='col'>
					<input
						type='text'
						className={
							isBuildingNameValid
								? 'form-control'
								: 'form-control is-invalid'
						}
						placeholder='Building Name'
						onChange={onBuildingNameChange}
						value={buildingName}
					/>
					<div className='invalid-feedback'>
						Please provide a building name
					</div>
				</div>

				<button
					className='btn btn-primary form-element-left-margin'
					onClick={onAddClick}
				>
					{isAddingBuilding ? (
						<div>
							Adding <FaSpinner className='spin' />
						</div>
					) : (
						'Add'
					)}
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
			<Rooms buildings={buildings} />
		</div>
	);
};

export default LocationContent;