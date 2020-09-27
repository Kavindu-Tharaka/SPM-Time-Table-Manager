import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../util/ItemTypes';
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';

import './roomCardEditable.css';

const RoomCardEditable = (props) => {
	const assignedTags = props.room.assignedTags;

	const removeTag = (tagId) => {
		const tagIds = assignedTags.filter((tag) => tag._id !== tagId);

		axios
			.patch(`http://localhost:8000/api/v1/rooms/${props.room._id}`, {
				assignedTags: [...tagIds],
			})
			.then((res) => {
				store.addNotification(
					buildToast('danger', 'Success', 'Tag Removed')
				);
				props.refreshComponent();
			})
			.catch((err) => {
				console.log(err.response);
			});
	};

	const assignRoom = (tag) => {
		const tags = [...assignedTags];
		const tagIds = [];

		tags.forEach((t) => {
			tagIds.push(t._id);
		});

		tagIds.push(tag);

		axios
			.patch(`http://localhost:8000/api/v1/rooms/${props.room._id}`, {
				assignedTags: [...new Set(tagIds)],
			})
			.then((res) => {
				store.addNotification(
					buildToast('success', 'Success', 'Room Assigned')
				);
				props.refreshComponent();
			})
			.catch((err) => {
				console.log(err.response);
			});
	};

	return (
		<div className='col p-1'>
			<div className='room-card-container'>
				<h5 className='m-0'>{props.room.roomName}</h5>
				<p className='m-0'>
					<strong>Capacity</strong> {props.room.capacity} |{' '}
					<strong>Floor</strong> {props.room.floor}
				</p>
				<p className='m-0'>
					<strong>Building</strong> {props.room.building.buildingName}
				</p>

				<div className='d-inline'>
					{props.room.assignedTags.length === 0 ? (
						<p>Not Assigned</p>
					) : null}

					{props.room.assignedTags.map((tag) => (
						<div
							className='edit-tag-in-room badge badge-pill badge-info mb-0 mr-1'
							key={tag._id}
						>
							{tag.tagname.charAt(0)}
							<button
								className='rce-sm-ctrl-btn sm-ctrl-btn-dlt rce-sm-ctrl-btn-dlt'
								onClick={() => {
									removeTag(tag._id);
								}}
							>
								<IoMdClose />
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default RoomCardEditable;
