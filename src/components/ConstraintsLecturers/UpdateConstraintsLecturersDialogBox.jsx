import React, { useState } from 'react';
import swal from '@sweetalert/with-react';
import axios from 'axios';
import './updateConstraintsLecturersDialogBox.css';
import { FaSpinner } from 'react-icons/fa';
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';
import moment from 'moment';
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';

const UpdateConstraintsLecturersDialogBox = (props) => {
	const [lecturers, setLecturers] = useState(props.lecturers);

	const [currentLecturerName, setCurrentLecturerName] = useState(props.name);
	const [lecturerIDbehalfOfName, setLecturerIDBehalfOfName] = useState(
		lecturers.find((element) => element.name === props.name)._id
	);
	const [day, setDay] = useState(props.day);

	const [from, setFrom] = useState(props.from);
	const [to, setTo] = useState(props.to);

	const [isConstraintValid, setIsConstraintValid] = useState(true);

	const [isFromValid, setIsFromValid] = useState(true);
	const [fromErrorMsg, setFromErrorMsg] = useState('');

	const [isToValid, setIsToValid] = useState(true);
	const [toErrorMsg, setToErrorMsg] = useState('');

	const [isUpdating, setIsUpdating] = useState(false);

	const _isBefore = (from, to) => {
		const fromTime = moment(from, 'HH:mm');
		const toTime = moment(to, 'HH:mm');
		return fromTime.isBefore(toTime);
	};

	const onLecturerChange = (e) => {
		// setCurrentLecturerName(e.target.value);
		setIsConstraintValid(true);

		const lecturerName = document.querySelector(
			'#autoCompleteInputLecturer'
		).value;

		const lecturer = lecturers.find(
			(lecturer) => lecturer.name === lecturerName.trim()
		);

		setLecturerIDBehalfOfName(lecturer ? lecturer._id : '');
	};

	const onDayChange = (e) => {
		setDay(e.target.value);
		setIsConstraintValid(true);
	};

	const onFromChange = (e) => {
		setFrom(e.target.value);
		setIsToValid(true);
		setIsFromValid(true);
		setToErrorMsg('');
		setFromErrorMsg('');
		setIsConstraintValid(true);
	};

	const onToChange = (e) => {
		setTo(e.target.value);
		setIsFromValid(true);
		setIsToValid(true);
		setFromErrorMsg('');
		setToErrorMsg('');
		setIsConstraintValid(true);
	};

	const editConstraint = () => {
		if (from === '') {
			setIsFromValid(false);
			setFromErrorMsg('Please Enter a starting time!');
		}
		if (to === '') {
			setIsToValid(false);
			setToErrorMsg('Please Enter a ending time!');
		} else if (!_isBefore(from, to)) {
			setIsFromValid(false);
			setFromErrorMsg('From-time should be before to To-time!');
			setIsToValid(false);
			setToErrorMsg('To-time should be after to From-time!');
		} else {
			setIsUpdating(true);

			let isExist = false;

			props.constraintsLectureList.forEach((element) => {
				if (
					element.day === day &&
					element.from === from &&
					element.to === to &&
					element.lecturer._id === lecturerIDbehalfOfName
				) {
					setIsConstraintValid(false);
					isExist = true;
					setIsUpdating(false);
				}
			});

			if (!isExist) {
				axios
					.patch(
						`https://time-table-manager.herokuapp.com/api/v1/constraintslecturers/${props.id}`,
						{
							lecturer: lecturerIDbehalfOfName,
							day: day,
							from: from,
							to: to,
						}
					)
					.then(function (response) {
						props.refreshComponent();
						setIsUpdating(false);
						store.addNotification(
							buildToast(
								'info',
								'Updated',
								'Constraint Updated Successfully'
							)
						);
						swal.close();
					})
					.catch(function (error) {
						console.log(error);
					});
			}
		}
	};

	return (
		<div className='dcdb-dialog-container'>
			<h5 className='text-left m-0'>
				{"Update Lecturers' Not Available Time"}
			</h5>
			<hr />

			{!isConstraintValid ? (
				<div
					style={{
						color: 'crimson',
						textAlign: 'left',
						fontSize: 14,
					}}
				>
					The Constraint You Entered is Already Exists!
				</div>
			) : null}

			<div className='form-row'>
				<div className='form-group col-md-12'>
					<label className='dialog-label'>Lecturer</label>

					<TextInput
						id='autoCompleteInputLecturer'
						Component='input'
						maxOptions={10}
						matchAny={true}
						defaultValue={currentLecturerName}
						trigger=''
						options={lecturers.map((lecturer) => lecturer.name)}
						onChange={onLecturerChange}
						style={{ height: 35, width: '100%', paddingLeft: 10 }}
					/>
				</div>
			</div>

			<div className='form-row'>
				<div className='form-group col-md-4'>
					<label className='dialog-label'>Day of Week</label>
					<select
						className='custom-select'
						onChange={onDayChange}
						value={day}
					>
						<option value='Monday'>Monday</option>
						<option value='Tuesday'>Tuesday</option>
						<option value='Wednesday'>Wednesday</option>
						<option value='Thursday'>Thursday</option>
						<option value='Friday'>Friday</option>
						<option value='Saturday'>Saturday</option>
						<option value='Sunday'>Sunday</option>
					</select>
				</div>
				<div className='form-group col-md-4'>
					<label className='dialog-label'>From</label>
					<input
						type='time'
						className={
							isFromValid
								? 'form-control'
								: 'form-control is-invalid'
						}
						onChange={onFromChange}
						value={from}
					/>
					<div className='invalid-feedback'>{fromErrorMsg}</div>
				</div>
				<div className='form-group col-md-4'>
					<label className='dialog-label'>To</label>
					<input
						type='time'
						className={
							isToValid
								? 'form-control'
								: 'form-control is-invalid'
						}
						onChange={onToChange}
						value={to}
					/>
					<div className='invalid-feedback'>{toErrorMsg}</div>
				</div>
			</div>

			<button
				className='btn btn-info float-right mb-4'
				onClick={editConstraint}
			>
				{isUpdating ? (
					<div>
						Updating <FaSpinner className='spin' />
					</div>
				) : (
					'Update'
				)}
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

export default UpdateConstraintsLecturersDialogBox;
