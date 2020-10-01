import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../util/ItemTypes';
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';
import axios from 'axios';

import './roomCard.css';

const RoomCardSubjects = (props) => {
	const name = props.room.roomName;
	const assignedSubjects = props.room.assignedSubjects;

	const assignRoom = (subject) => {
		props.setAssigning(true);

		const subjects = [...assignedSubjects];
		const subjectIds = [];

		subjects.forEach((t) => {
			subjectIds.push(t._id);
		});

		subjectIds.push(subject);

		axios
			.patch(`http://localhost:8000/api/v1/rooms/${props.room._id}`, {
				assignedSubjects: [...new Set(subjectIds)],
			})
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
		item: { name, type: ItemTypes.RoomCardSubjects },
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
					{props.room.assignedSubjects.length === 0 ? (
						<p>Not Assigned</p>
					) : null}

					{props.room.assignedSubjects.map((subject) => (
						<p
							className='badge badge-pill badge-info mb-0 mr-1'
							key={subject._id}
						>
							{subject.subjectCode}
						</p>
					))}
				</div>
			</div>
		</div>
	);
};

export default RoomCardSubjects;
