import React, { useEffect, useState } from 'react';
import './assignRooms.css';
import axios from 'axios';
import ContentHeader from '../ContentHeader/ContentHeader';
import EmptyDataPlaceholder from '../EmptyDataPlacehoder/EmptyDataPlaceholder';
import { FaSpinner } from 'react-icons/fa';
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';

import BuildingCards from '../BuildingCards/BuildingCards';
import Rooms from '../Rooms/Rooms';
import PreLoader from '../PreLoader/PreLoader';
import UnavailableTimesTable from './UnavailableTimesTable';

const UnavailableTimes = (props) => {
	const [buildings, setBuildings] = useState([]);
	const [rooms, setRooms] = useState([]);

	const [roomName, setRoomName] = useState('');
	const [day, setDay] = useState('');
	const [from, setFrom] = useState('');
	const [to, setTo] = useState('');

	const [isValidFrom, setIsValidFrom] = useState(true);
	const [isValidTo, setIsValidTo] = useState(true);

	const onRoomNameChange = (e) => {
		setRoomName(e.target.value);
	};

	const onDayChange = (e) => {
		setDay(e.target.value);
	};

	const onFromChange = (e) => {
		setIsValidFrom(true);
		setFrom(e.target.value);
	};

	const onToChange = (e) => {
		setIsValidTo(true);
		setTo(e.target.value);
	};

	const onAddClick = () => {
		if (roomName === '' || day === '' || from === '' || to === '') {
			if (from === '') {
				setIsValidFrom(false);
			}

			if (to === '') {
				setIsValidTo(false);
			}
			return;
		}

		setIsAdding(true);
		const selectedRoom = rooms.find((r) => (r._id = roomName));
		const newUnAvailableTime = {
			date: day,
			from: from,
			to: to,
		};
		const unAvailableTimes = [
			...selectedRoom.unAvailableTimes,
			newUnAvailableTime,
		];

		axios
			.patch(
				`https://time-table-manager.herokuapp.com/api/v1/rooms/${roomName}`,
				{
					unAvailableTimes: unAvailableTimes,
				}
			)
			.then((res) => {
				setIsAdding(false);
				refreshComponent();
			})
			.catch((err) => {
				setIsAdding(false);
			});
	};

	const [loading, setLoading] = useState(true);
	const [isAdding, setIsAdding] = useState(false);

	const [updateComponent, setUpdateComponent] = useState(0);

	const days = [
		{ _id: 'weekday1', day: 'Monday' },
		{ _id: 'weekday2', day: 'Tuesday' },
		{ _id: 'weekday3', day: 'Wednesday' },
		{ _id: 'weekday4', day: 'Thursday' },
		{ _id: 'weekday5', day: 'Friday' },
	];

	const refreshComponent = () => {
		setUpdateComponent(Math.random());
	};

	useEffect(() => {
		axios
			.get('https://time-table-manager.herokuapp.com/api/v1/rooms')
			.then((res) => {
				setRooms(res.data.data.rooms);
				setDay(days[0].day);
				if (res.data.data.rooms.length !== 0) {
					setRoomName(res.data.data.rooms[0]._id);
				}

				setLoading(false);
			})
			.catch((err) => {
				console.log(err.response);
			});
	}, [updateComponent]);

	return (
		<div>
			<PreLoader loading={loading} hasSideBar={true} />
			<ContentHeader header='Room Unavailable Times' />

			<div className='form-row'>
				<div className='form-group col-3'>
					<label>Room</label>
					<select
						className='br-0 form-control form-control'
						onChange={onRoomNameChange}
					>
						{rooms.map((room) => {
							return (
								<option key={room._id} value={room._id}>
									{room.roomName}
								</option>
							);
						})}
					</select>
				</div>
				<div className='form-group col-3'>
					<label>Day of the week</label>
					<select
						className='br-0 form-control form-control'
						onChange={onRoomNameChange}
					>
						{days.map((day) => {
							return (
								<option key={day._id} value={day.day}>
									{day.day}
								</option>
							);
						})}
					</select>
				</div>
				<div className='form-group col-2'>
					<label>From</label>
					<input
						type='time'
						className={
							isValidFrom
								? 'form-control'
								: 'form-control is-invalid'
						}
						onChange={onFromChange}
						value={from}
					/>
					<div className='invalid-feedback'>Required</div>
				</div>
				<div className='form-group col-2'>
					<label>To</label>
					<input
						type='time'
						className={
							isValidTo
								? 'form-control'
								: 'form-control is-invalid'
						}
						onChange={onToChange}
						value={to}
					/>
					<div className='invalid-feedback'>Required</div>
				</div>
				<div className='form-group col-2'>
					<button
						className='btn btn-primary float-right'
						onClick={onAddClick}
						style={{ marginTop: '30px' }}
					>
						{isAdding ? (
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
			<UnavailableTimesTable
				rooms={rooms}
				refreshComponent={refreshComponent}
			/>
		</div>
	);
};

export default UnavailableTimes;
