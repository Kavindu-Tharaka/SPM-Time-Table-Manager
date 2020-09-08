import React, { useState } from 'react';
import swal from '@sweetalert/with-react';
import axios from 'axios';

import './updateRoomDialogBox.css';

const UpdateRoomDialogBox = (props) => {
	const [buildingName, setBuildingName] = useState(props.room.building);
	const [roomName, setRoomName] = useState(props.room.roomName);
	const [floor, setFloor] = useState(props.room.floor);
	const [capacity, setCapacity] = useState(props.room.capacity);
	const [roomType, setRoomType] = useState(props.room.roomType);

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

	const onUpdateClick = (e) => {
		axios
			.patch(`http://localhost:8000/api/v1/rooms/${props.room._id}`, {
				building: buildingName,
				roomName,
				floor,
				capacity,
				roomType,
			})
			.then((res) => {
				swal.close();
				props.refreshComponent();
			})
			.catch((err) => {
				console.log(err.response);
			});
	};

	return (
		<div className='dcdb-dialog-container'>
			<h5 className='text-left m-0'>Update Room</h5>
			<hr />

			<div className='form-row'>
				<div className='form-group col'>
					<label className='dialog-label'>Building</label>
					<select
						className='br-0 form-control form-control'
						onChange={onBuildingChange}
						value={buildingName}
					>
						{props.buildings.map((building) => {
							return (
								<option key={building._id} value={building._id}>
									{building.buildingName}
								</option>
							);
						})}
					</select>
				</div>
			</div>

			<div className='form-row'>
				<div className='form-group col'>
					<label className='dialog-label'>Room Name</label>
					<input
						type='text'
						className='form-control'
						placeholder='Room Name'
						onChange={onRoomNameChange}
						value={roomName}
					/>
				</div>
			</div>

			<div className='form-row'>
				<div className='form-group col-6'>
					<label className='dialog-label'>Floor</label>
					<input
						type='number'
						className='form-control'
						placeholder='00'
						onChange={onFloorChange}
						value={floor}
					/>
				</div>
				<div className='form-group col-6'>
					<label className='dialog-label'>Capacity</label>
					<input
						type='number'
						className='form-control'
						placeholder='00'
						onChange={onCapacityChange}
						value={capacity}
					/>
				</div>
			</div>

			<div className='form-row'>
				<label className='dialog-label'>Room Type</label>
				<div className='custom-control custom-radio custom-control-inline'>
					<input
						type='radio'
						id='customRadioInline1'
						name='customRadioInline1'
						className='custom-control-input'
						checked={roomType === 'lecture-hall'}
						onChange={() => {
							setRoomType('lecture-hall');
						}}
					/>
					<label
						className='custom-control-label'
						htmlFor='customRadioInline1'
					>
						Lecture Hall
					</label>
				</div>
				<div className='custom-control custom-radio custom-control-inline'>
					<input
						type='radio'
						id='customRadioInline2'
						name='customRadioInline1'
						className='custom-control-input'
						checked={roomType === 'laboratory'}
						onChange={() => {
							setRoomType('laboratory');
						}}
					/>
					<label
						className='custom-control-label'
						htmlFor='customRadioInline2'
					>
						Laboratory
					</label>
				</div>
			</div>

			<p className='text-left'>{props.itemName}</p>
			<button
				className='btn btn-info float-right mb-4'
				onClick={onUpdateClick}
			>
				Update
			</button>
			<button
				className='btn btn-secondary float-right mb-4 mr-2'
				onClick={() => {
					swal.close();
				}}
			>
				Cancel
			</button>
		</div>
	);
};

export default UpdateRoomDialogBox;
