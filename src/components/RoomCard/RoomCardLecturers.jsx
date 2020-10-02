import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../util/ItemTypes';
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';
import axios from 'axios';

import './roomCard.css';

const RoomCardLecturers = (props) => {
	const name = props.room.roomName;
	const assignedLecturers = props.room.assignedLecturers;

	const assignRoom = (lecturer) => {
		props.setAssigning(true);

		const lecturers = [...assignedLecturers];
		const lecturerIds = [];

		lecturers.forEach((t) => {
			lecturerIds.push(t._id);
		});

		lecturerIds.push(lecturer);

		axios
			.patch(
				`https://time-table-manager.herokuapp.com/api/v1/rooms/${props.room._id}`,
				{
					assignedLecturers: [...new Set(lecturerIds)],
				}
			)
			.then((res) => {
				store.addNotification(
					buildToast('success', 'Success', 'Room Assigned')
				);
				props.setAssigning(false);
				props.refreshComponent();
			})
			.catch((err) => {
				props.setAssigning(false);
				console.log(err.response);
			});
	};

	const [{ isDragging }, drag] = useDrag({
		item: { name, type: ItemTypes.RoomCardLecturers },
		end: (item, monitor) => {
			const dropResult = monitor.getDropResult();
			if (item && dropResult) {
				assignRoom(dropResult.name);
			}
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const opacity = isDragging ? 0 : 1;

	return (
		<div className='col p-1'>
			<div className='room-card-container' ref={drag} style={{ opacity }}>
				<h5 className='m-0'>{name}</h5>
				<p className='m-0'>
					<strong>Capacity</strong> {props.room.capacity} |{' '}
					<strong>Floor</strong> {props.room.floor}
				</p>
				<p className='m-0'>
					<strong>Building</strong> {props.room.building.buildingName}
				</p>

				<div className='d-inline'>
					{props.room.assignedLecturers.length === 0 ? (
						<p>Not Assigned</p>
					) : null}

					{props.room.assignedLecturers.map((lecturer) => (
						<p
							className='badge badge-pill badge-info mb-0 mr-1'
							key={lecturer._id}
						>
							{lecturer.employeeId}
						</p>
					))}
				</div>
			</div>
		</div>
	);
};

export default RoomCardLecturers;
