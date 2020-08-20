import React, { useState, useEffect } from 'react';
import EmptyDataPlaceholder from '../EmptyDataPlacehoder/EmptyDataPlaceholder';
import ContentHeader from '../ContentHeader/ContentHeader';
import axios from 'axios';
import RoomsTable from './RoomsTable';

const Rooms = (props) => {
	const [buildings, setBuildings] = useState([]);
	const [rooms, setRooms] = useState([]);

	const [buildingName, setBuildingName] = useState('');
	const [roomName, setRoomName] = useState('');
	const [floor, setFloor] = useState('');
	const [capacity, setCapacity] = useState('');
	const [roomType, setRoomType] = useState('lecture-hall');

	const [updateComponent, setUpdateComponent] = useState(0);

	const refreshComponent = () => {
		setUpdateComponent(Math.random());
	};

	const onBuildingChange = (e) => {
		setBuildingName(e.target.value);
	};

	const onRoomNameChange = (e) => {
		setRoomName(e.target.value);
	};

	const onFloorChange = (e) => {
		setFloor(e.target.value);
	};

	const onCapacityChange = (e) => {
		setCapacity(e.target.value);
	};

	const onAddClick = (e) => {
		axios
			.post('http://localhost:8000/api/v1/rooms', {
				building: buildingName,
				roomName,
				floor,
				capacity,
				roomType,
			})
			.then((res) => {
				setRooms([...rooms, res.data.data.room]);
				// TODO: Clear input fields
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
	}, [updateComponent]);

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
						className='form-control'
						placeholder='Room Name'
						onChange={onRoomNameChange}
						value={roomName}
					/>
				</div>
				<div className='form-group col-md-1'>
					<label>Floor</label>
					<input
						type='number'
						className='form-control'
						placeholder='00'
						onChange={onFloorChange}
						value={floor}
					/>
				</div>
				<div className='form-group col-md-1'>
					<label>Capacity</label>
					<input
						type='number'
						className='form-control'
						placeholder='00'
						onChange={onCapacityChange}
						value={capacity}
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
						Add
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
