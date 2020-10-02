import React, { useState } from 'react';
import swal from '@sweetalert/with-react';
import axios from 'axios';
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';

const UpdateSubjectBox = (props) => {
	const [subjectCode, setSubjectCode] = useState(props.sub.subjectCode);
	const [offeredYear, setOfferedYear] = useState(props.sub.offeredYear);
	const [offeredSemester, setOfferedSemester] = useState(
		props.sub.offeredSemester
	);
	const [subjectName, setSubjetName] = useState(props.sub.subjectName);
	const [numberOfLecHrs, setNumberOfLecHrs] = useState(
		props.sub.numberOfLecHrs
	);
	const [numberOfTutorialHrs, setNumberOfTutorialHrs] = useState(
		props.sub.numberOfTutorialHrs
	);
	const [numberOfLabHrs, setNumberOfLabHrs] = useState(
		props.sub.numberOfLabHrs
	);
	const [numberOfEveluationHrs, setnumberOfEveluationHrs] = useState(
		props.sub.numberOfEveluationHrs
	);

	const [isCodevalid, setIsCodeValid] = useState(true);
	const [isNameValid, setIsNameValid] = useState(true);
	const [isLecHrsValid, setIsLecHrsValid] = useState(true);
	const [isTutHrsValid, setIsTutHrsValid] = useState(true);
	const [isEveHrsValid, setIsEveHrsValid] = useState(true);
	const [isLabHrsValid, setIsLabHrsValid] = useState(true);

	const onYearChange = (e) => {
		setOfferedYear(e.target.value);
	};
	const onLecHrsChange = (e) => {
		setNumberOfLecHrs(e.target.value);
	};
	const onSubjectCodeChange = (e) => {
		setSubjectCode(e.target.value);
	};
	const onLabHrsChange = (e) => {
		setNumberOfLabHrs(e.target.value);
	};
	const onSemesterChange = (e) => {
		setOfferedSemester(e.target.value);
	};
	const onSubjectNameChange = (e) => {
		setSubjetName(e.target.value);
	};
	const onTutorialHrsChange = (e) => {
		setNumberOfTutorialHrs(e.target.value);
	};
	const onEvelutionsChange = (e) => {
		setnumberOfEveluationHrs(e.target.value);
	};

	const onUpdateClick = () => {
		let hasErrorDetected = false;

		if (subjectName === '') {
			setIsNameValid(false);
			hasErrorDetected = true;
		}
		if (subjectCode === '') {
			setIsCodeValid(false);
			hasErrorDetected = true;
		}
		if (numberOfLecHrs === '') {
			setIsLecHrsValid(false);
			hasErrorDetected = true;
		}
		if (numberOfTutorialHrs === '') {
			setIsTutHrsValid(false);
			hasErrorDetected = true;
		}
		if (numberOfLabHrs === '') {
			setIsLabHrsValid(false);
			hasErrorDetected = true;
		}
		if (numberOfEveluationHrs === '') {
			setIsEveHrsValid(false);
			hasErrorDetected = true;
		}
		if (hasErrorDetected) {
			return;
		}

		axios
			.patch(
				`https://time-table-manager.herokuapp.com/api/v1/subjects/${props.sub._id}`,
				{
					subjectCode,
					offeredYear,
					offeredSemester,
					subjectName,
					numberOfLecHrs,
					numberOfTutorialHrs,
					numberOfLabHrs,
					numberOfEveluationHrs,
				}
			)
			.then((res) => {
				// window.location.reload();
				swal.close();
				store.addNotification(
					buildToast('success', '', 'Subject Updated')
				);
				props.setRefresh(!props.refresh);
			})
			.catch((e) => {
				console.log(e);
				store.addNotification(
					buildToast('warning', '', 'Subject Update Error')
				);
			});
	};

	return (
		<div>
			<div>
				<div className='dcdb-dialog-container'>
					<h5 className='text-left m-0'>Update Subject details</h5>
					<hr />
					<div className='form-row'>
						<div className='form-group col'>
							<label className='dialog-label'>Offered Year</label>
							<select
								value={offeredYear}
								onChange={(e) => onYearChange(e)}
								name='level'
								className='form-control'
							>
								<option value='1'>1</option>
								<option value='2'>2</option>
								<option value='3'>3</option>
								<option value='4'>4</option>
							</select>
						</div>

						<div className='form-group col'>
							<label className='dialog-label'>Subject Code</label>
							<input
								type='text'
								className={
									isCodevalid
										? 'form-control'
										: 'form-control is-invalid'
								}
								// placeholder='Room Name'
								value={subjectCode}
								onChange={onSubjectCodeChange}
							/>
							<div className='invalid-feedback'>
								Please provide subject code
							</div>
						</div>
					</div>

					<div className='form-row'>
						<div className='form-group col'>
							<label className='dialog-label'> Lec Hrs</label>
							<input
								type='text'
								className={
									isLecHrsValid
										? 'form-control'
										: 'form-control is-invalid'
								}
								onChange={onLecHrsChange}
								value={numberOfLecHrs}
							/>
							<div className='invalid-feedback'>
								Please provide lecture duration
							</div>
						</div>

						<div className='form-group col'>
							<label className='dialog-label'>Lab Hrs</label>
							<input
								type='text'
								className={
									isLabHrsValid
										? 'form-control'
										: 'form-control is-invalid'
								}
								onChange={onLabHrsChange}
								value={numberOfLabHrs}
							/>
							<div className='invalid-feedback'>
								Please provide lab duration
							</div>
						</div>
					</div>

					<div className='form-row'>
						<div className='form-group col'>
							<label className='dialog-label'>
								Offered Semester
							</label>
							<select
								value={offeredSemester}
								onChange={(e) => onSemesterChange(e)}
								name='level'
								className='form-control'
							>
								<option name='S1' value='S1'>
									S1
								</option>
								<option name='S2' value='S2'>
									S2
								</option>
							</select>
						</div>

						<div className='form-group col'>
							<label className='dialog-label'>Subject Name</label>
							<input
								type='text'
								className={
									isNameValid
										? 'form-control'
										: 'form-control is-invalid'
								}
								onChange={onSubjectNameChange}
								value={subjectName}
							/>
							<div className='invalid-feedback'>
								Please provide subject name
							</div>
						</div>
					</div>
					<div className='form-row'>
						<div className='form-group col'>
							<label className='dialog-label'>Tutorial Hrs</label>
							<input
								type='text'
								className={
									isTutHrsValid
										? 'form-control'
										: 'form-control is-invalid'
								}
								onChange={onTutorialHrsChange}
								value={numberOfTutorialHrs}
							/>
							<div className='invalid-feedback'>
								Please provide tutorial duration
							</div>
						</div>
						<div className='form-group col'>
							<label className='dialog-label'>
								Evalution Hrs
							</label>
							<input
								type='text'
								className={
									isEveHrsValid
										? 'form-control'
										: 'form-control is-invalid'
								}
								onChange={onEvelutionsChange}
								value={numberOfEveluationHrs}
							/>
							<div className='invalid-feedback'>
								Please provide evelution duration
							</div>
						</div>
					</div>

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
			</div>
		</div>
	);
};

export default UpdateSubjectBox;
