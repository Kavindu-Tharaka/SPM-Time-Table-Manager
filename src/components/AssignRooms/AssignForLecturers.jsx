import React, { useEffect, useState } from 'react';
import ContentHeader from '../ContentHeader/ContentHeader';
import { ItemTypes } from '../../util/ItemTypes';
import { useDrop } from 'react-dnd';
import axios from 'axios';

import './assignRooms.css';
import EmptyDataPlaceholder from '../EmptyDataPlacehoder/EmptyDataPlaceholder';
import PreLoader from '../PreLoader/PreLoader';
import { FaSpinner } from 'react-icons/fa';
import RoomCardLecturers from '../RoomCard/RoomCardLecturers';
import AssignForLecturersTable from './AssignForLecturersTable';

const AssignForLecturers = () => {
	const [buildings, setBuildings] = useState([]);
	const [lecturers, setLecturers] = useState([]);
	const [rooms, setRooms] = useState([]);

	const [selectedBuilding, setSelectedBuilding] = useState('');
	const [selectedLecturer, setSelectedLecturer] = useState('');

	const [roomsOfSelectedBuilding, setRoomsOfSelectedBuilding] = useState([]);

	const [updateComponent, setUpdateComponent] = useState(0);

	const [loading, setLoading] = useState(true);

	const [assigning, setAssigning] = useState(false);

	const refreshComponent = () => {
		setUpdateComponent(Math.random());
	};

	const onBuildingChange = (e) => {
		setSelectedBuilding(e.target.value);
		if (e.target.value !== 'all') {
			const sRooms = rooms.filter(
				(room) => room.building._id === e.target.value
			);
			setRoomsOfSelectedBuilding([...sRooms]);
		} else {
			setRoomsOfSelectedBuilding([...rooms]);
		}
	};

	const onLecturerChange = (e) => {
		setSelectedLecturer(e.target.value);
	};

	const [{ canDrop, isOver }, drop] = useDrop({
		accept: ItemTypes.RoomCardLecturers,
		drop: () => ({ name: selectedLecturer }),
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	});

	const isActive = canDrop && isOver;

	useEffect(() => {
		axios
			.all([
				axios.get('http://localhost:8000/api/v1/buildings'),
				axios.get('http://localhost:8000/api/v1/rooms'),
				axios.get('http://localhost:8000/api/v1/lecturers'),
			])
			.then(
				axios.spread((aBuildings, aRooms, aLecturers) => {
					setBuildings(aBuildings.data.data.buildings);
					if (aBuildings.data.data.buildings.length !== 0) {
						setSelectedBuilding(
							aBuildings.data.data.buildings[0]._id
						);
					}

					setRooms(aRooms.data.data.rooms);
					setRoomsOfSelectedBuilding(aRooms.data.data.rooms);

					setLecturers(aLecturers.data.data.lecturers);
					if (aLecturers.data.data.lecturers.length !== 0) {
						setSelectedLecturer(
							aLecturers.data.data.lecturers[0]._id
						);
					}
				})
			)
			.catch((err) => {
				console.log(err.response);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [updateComponent]);

	return (
		<div>
			<PreLoader loading={loading} hasSideBar={true} />
			<ContentHeader header='Allocate Rooms For Lecturers' />
			<div className='row'>
				<div className='top-left-container col'>
					<div className='form-row p-0'>
						<label>Building</label>
						<select
							className='br-0 form-control form-control'
							onChange={onBuildingChange}
						>
							<option value='all'>All</option>
							{buildings.map((building) => {
								return (
									<option
										key={building._id}
										value={building._id}
									>
										{building.buildingName}
									</option>
								);
							})}
						</select>
					</div>

					<p className='mt-3 mb-1'>Rooms</p>
					<hr className='mt-0' />

					<div className='left-room-container'>
						{roomsOfSelectedBuilding.length === 0 ? (
							<EmptyDataPlaceholder message='Room list is currently empty for selected building' />
						) : null}
						<div className='row row-cols-2 pr-2 pl-2'>
							{roomsOfSelectedBuilding.map((room) => (
								<RoomCardLecturers
									key={room._id}
									room={room}
									refreshComponent={refreshComponent}
									setAssigning={setAssigning}
								/>
							))}
						</div>
					</div>
				</div>

				<div className='top-right-container col'>
					<div className='form-row p-0'>
						<label>Lecturer</label>
						<select
							className='br-0 form-control form-control'
							onChange={onLecturerChange}
						>
							{lecturers.map((lecturer) => {
								return (
									<option
										key={lecturer._id}
										value={lecturer._id}
									>
										{lecturer.name}
									</option>
								);
							})}
						</select>
					</div>

					<p className='mt-3 mb-1'>Tag</p>
					<hr className='mt-0' />
					<div
						className={
							isActive
								? 'right-drag-container-active'
								: 'right-drag-container'
						}
						ref={drop}
					>
						{assigning ? (
							<p>
								Assigning <FaSpinner className='spin' />
							</p>
						) : (
							<p>
								{isActive
									? 'Release to drop'
									: 'Drag a room here'}
							</p>
						)}
					</div>
				</div>
			</div>
			<br />
			<ContentHeader header='Allocated Rooms' />
			{rooms.length === 0 ? (
				<EmptyDataPlaceholder message='Room list is currently empty' />
			) : (
				<AssignForLecturersTable
					rooms={rooms}
					refreshComponent={refreshComponent}
				/>
			)}
		</div>
	);
};

export default AssignForLecturers;
