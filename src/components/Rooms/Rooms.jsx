import React, { useState, useEffect } from 'react';
import EmptyDataPlaceholder from '../EmptyDataPlacehoder/EmptyDataPlaceholder';
import ContentHeader from '../ContentHeader/ContentHeader';
import axios from 'axios';
import RoomsTable from './RoomsTable';
import { FaSpinner } from 'react-icons/fa';
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';

const Rooms = (props) => {
	const [buildings, setBuildings] = useState([]);
	const [rooms, setRooms] = useState([]);

	const [buildingName, setBuildingName] = useState('');
	const [roomName, setRoomName] = useState('');
	const [floor, setFloor] = useState('');
	const [capacity, setCapacity] = useState('');
	const [roomType, setRoomType] = useState('lecture-hall');

	const [updateComponent, setUpdateComponent] = useState(0);

	// Validation
	const [isRoomNameValid, setIsRoomNameValid] = useState(true);
	const [isFloorValid, setIsFloorValid] = useState(true);
	const [isCapacityValid, setIsCapacityValid] = useState(true);

	// Loading
	const [isAddingRoom, setIsAddingRoom] = useState(false);

	const refreshComponent = () => {
		setUpdateComponent(Math.random());
	};

	const onBuildingChange = (e) => {
		setBuildingName(e.target.value);
	};

	const onRoomNameChange = (e) => {
		setIsRoomNameValid(true);
		setRoomName(e.target.value);
	};

	const onFloorChange = (e) => {
		setIsFloorValid(true);
		if (e.target.value >= 0) {
			setFloor(e.target.value);
		}
	};

	const onCapacityChange = (e) => {
		setIsCapacityValid(true);
		if (e.target.value >= 0) {
			setCapacity(e.target.value);
		}
	};

	const onAddClick = (e) => {
		let hasErrorDetected = false;

		if (roomName === '') {
			setIsRoomNameValid(false);
			hasErrorDetected = true;
		}

		if (floor === '') {
			setIsFloorValid(false);
			hasErrorDetected = true;
		}

		if (capacity === '') {
			setIsCapacityValid(false);
			hasErrorDetected = true;
		}

		if (hasErrorDetected) {
			return;
		}

		setIsAddingRoom(true);

		axios
			.post('http://localhost:8000/api/v1/rooms', {
				building: buildingName,
				roomName,
				floor,
				capacity,
				roomType,
			})
			.then((res) => {
				refreshComponent();

				setRoomName('');
				setFloor('');
				setCapacity('');
				setRoomType('lecture-hall');

				setIsAddingRoom(false);

				store.addNotification(
					buildToast('success', 'Success', 'Room Added Successfully')
				);
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
				if (res.data.data.buildings.length !== 0) {
					setBuildingName(res.data.data.buildings[0]._id);
				}
			})
			.catch((err) => {
				console.log(err.response);
			});

		axios
			.get('http://localhost:8000/api/v1/rooms')
			.then((res) => {
				setRooms(res.data.data.rooms);
			})
			.catch((err) => {
				console.log(err.response);
			});
	}, [updateComponent, props.buildings]);

	return (
		<div>
			<ContentHeader header='Rooms' label='All' />

			<div className='form-row'>
				<div className='form-group col-md-3'>
					<label>Building</label>
					<select
						className='br-0 form-control form-control'
						onChange={onBuildingChange}
					>
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
						className={
							isRoomNameValid
								? 'form-control'
								: 'form-control is-invalid'
						}
						placeholder='Room Name'
						onChange={onRoomNameChange}
						value={roomName}
					/>
					<div className='invalid-feedback'>
						Please provide a room name
					</div>
				</div>
				<div className='form-group col-md-1'>
					<label>Floor</label>
					<input
						type='number'
						className={
							isFloorValid
								? 'form-control'
								: 'form-control is-invalid'
						}
						placeholder='00'
						onChange={onFloorChange}
						value={floor}
					/>
					<div className='invalid-feedback'>
						Please provide floor number
					</div>
				</div>
				<div className='form-group col-md-1'>
					<label>Capacity</label>
					<input
						type='number'
						className={
							isCapacityValid
								? 'form-control'
								: 'form-control is-invalid'
						}
						placeholder='00'
						onChange={onCapacityChange}
						value={capacity}
					/>
					<div className='invalid-feedback'>
						Please provide the capacity
					</div>
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
								checked={roomType === 'lecture-hall'}
								onChange={() => {
									setRoomType('lecture-hall');
								}}
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
								checked={roomType === 'laboratory'}
								onChange={() => {
									setRoomType('laboratory');
								}}
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
					<button
						className='btn btn-primary float-right mt-4'
						onClick={onAddClick}
					>
						{isAddingRoom ? (
							<div>
								Adding <FaSpinner className='spin' />
							</div>
						) : (
							'Add'
						)}
					</button>
				</div>
			</div>
			<br />

			{rooms.length === 0 ? (
				<EmptyDataPlaceholder message='Room list is currently empty' />
			) : (
				<RoomsTable
					rooms={rooms}
					buildings={buildings}
					refreshComponent={refreshComponent}
				/>
			)}
		</div>
	);
};

export default Rooms;
