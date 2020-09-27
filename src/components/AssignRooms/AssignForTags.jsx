import React, { useEffect, useState } from 'react';
import ContentHeader from '../ContentHeader/ContentHeader';
import { ItemTypes } from '../../util/ItemTypes';
import { useDrop } from 'react-dnd';
import axios from 'axios';

import './assignRooms.css';
import RoomCard from '../RoomCard/RoomCard';

const AssignForTags = (props) => {
	const [buildings, setBuildings] = useState([]);
	const [tags, setTags] = useState([]);
	const [rooms, setRooms] = useState([]);

	const [selectedBuidlign, setSelectedBuilding] = useState('');
	const [selectedTag, setSelectedTag] = useState('');

	const [updateComponent, setUpdateComponent] = useState(0);

	const refreshComponent = () => {
		setUpdateComponent(Math.random());
	};

	const onBuildingChange = (e) => {
		setSelectedBuilding(e.target.value);
	};

	const onTagChange = (e) => {
		setSelectedTag(e.target.value);
	};

	const [{ canDrop, isOver }, drop] = useDrop({
		accept: ItemTypes.RoomCard,
		drop: () => ({ name: selectedTag }),
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	});

	const isActive = canDrop && isOver;

	useEffect(() => {
		axios
			.get('http://localhost:8000/api/v1/buildings')
			.then((res) => {
				setBuildings(res.data.data.buildings);
				if (res.data.data.buildings.length !== 0) {
					setSelectedBuilding(res.data.data.buildings[0]._id);
				}
			})
			.catch((err) => {
				console.log(err.response);
			});

		axios
			.get('http://localhost:8000/api/v1/tags')
			.then((res) => {
				setTags(res.data.data.tags);
				if (res.data.data.tags.length !== 0) {
					setSelectedTag(res.data.data.tags[0]._id);
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
			<ContentHeader header='Allocate Rooms For Tags' />
			<div className='top-left-container'>
				<div className='form-row p-0'>
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

				<p className='mt-3 mb-1'>Rooms</p>
				<hr className='mt-0' />

				<div className='left-room-container'>
					<div className='row row-cols-2 pr-2 pl-2'>
						{rooms.map((room) => (
							<RoomCard key={room._id} room={room} refreshComponent={refreshComponent}/>
						))}
					</div>
				</div>
			</div>

			<div className='top-right-container'>
				<div className='form-row p-0'>
					<label>Tag</label>
					<select
						className='br-0 form-control form-control'
						onChange={onTagChange}
					>
						{tags.map((tag) => {
							return (
								<option key={tag._id} value={tag._id}>
									{tag.tagname}
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
					<p>{isActive ? 'Release to drop' : 'Drag a room here'}</p>
				</div>
			</div>
		</div>
	);
};

export default AssignForTags;
