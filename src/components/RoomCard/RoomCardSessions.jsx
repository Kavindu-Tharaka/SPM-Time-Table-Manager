import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../util/ItemTypes';
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';
import axios from 'axios';

import './roomCard.css';

const RoomCardSessions = (props) => {
	const name = props.room.roomName;
	const assignedSessions = props.room.assignForSessions;

	const assignRoom = (session) => {
		props.setAssigning(true);

		const sessions = [...assignedSessions];
		const sessionIds = [];

		sessions.forEach((t) => {
			sessionIds.push(t._id);
		});

		sessionIds.push(session);

		axios
			.patch(`http://localhost:8000/api/v1/rooms/${props.room._id}`, {
				assignForSessions: [...new Set(sessionIds)],
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
		item: { name, type: ItemTypes.RoomCardSessions },
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
					{props.room.assignForSessions.length === 0 ? (
						<p>Not Assigned</p>
					) : <p>Assigned</p>}
				</div>
			</div>
		</div>
	);
};

export default RoomCardSessions;
