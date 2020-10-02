import React, { useState, useEffect } from 'react';
import swal from '@sweetalert/with-react';
import axios from 'axios';
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';

const UpdateLecturerDialogBox = (props) => {
	const [name, setName] = useState(props.lec.name);
	const [faculty, setFaculty] = useState(props.lec.faculty);
	const [center, setCenter] = useState(props.lec.center);
	const [level, setLevel] = useState(props.lec.level);
	const [department, setDepartment] = useState(props.lec.department);
	const [building, setBuilding] = useState(props.lec.building);
	const [employeeId, setEmployeeId] = useState(props.lec.employeeId);
	const [rank, setRank] = useState(1);
	const [rankVal, setRankVal] = useState(props.lec.rankVal);
	const [buildings, setBuildings] = useState([]);

	const [isNameVaid, setIsNameValid] = useState(true);
	const [isFacultyValid, setIsFacultyValid] = useState(true);
	const [isCenterValid, setIsCenterValid] = useState(true);
	const [isEmpIdValid, setIsEmpIdValid] = useState(true);
	const [isDepartmentValid, setIsDepartmentValid] = useState(true);

	const onNameChange = (e) => {
		setName(e.target.value);
	};
	const onFacultyChange = (e) => {
		setFaculty(e.target.value);
	};
	const onCenterChange = (e) => {
		setCenter(e.target.value);
	};
	const onLevelChange = (e) => {
		if (e.target.value === 'Professor') {
			setRank(1);
		} else if (e.target.value === 'Assistant Professor') {
			setRank(2);
		} else if (e.target.value === 'Senior Lecturer(HG)') {
			setRank(3);
		} else if (e.target.value === 'Senior Lecturer') {
			setRank(4);
		} else if (e.target.value === 'Lecturer') {
			setRank(5);
		} else if (e.target.value === 'Assistant Lecturer') {
			setRank(6);
		} else if (e.target.value === 'Instructor') {
			setRank(7);
		}
		setLevel(e.target.value);
	};
	const onEmpIdChange = (e) => {
		setEmployeeId(e.target.value);
		setRankVal(`${rank}.${e.target.value}`);
	};
	const onDepartmentChange = (e) => {
		setDepartment(e.target.value);
	};
	const onBuildingChange = (e) => {
		setBuilding(e.target.value);
	};

	const onUpdateClick = () => {
		let hasErrorDetected = false;

		if (name === '') {
			setIsNameValid(false);
			hasErrorDetected = true;
		}
		if (center === '') {
			setIsCenterValid(false);
			hasErrorDetected = true;
		}
		if (faculty === '') {
			setIsFacultyValid(false);
			hasErrorDetected = true;
		}
		if (employeeId.length !== 6 || employeeId === '') {
			setIsEmpIdValid(false);
			hasErrorDetected = true;
		}
		if (department === '') {
			setIsDepartmentValid(false);
			hasErrorDetected = true;
		}
		if (hasErrorDetected) {
			return;
		}

		axios
			.patch(
				`https://time-table-manager.herokuapp.com/api/v1/lecturers/${props.lec._id}`,
				{
					name,
					faculty,
					center,
					level,
					employeeId,
					department,
					building,
					rankVal,
				}
			)
			.then((res) => {
				props.setRefresh(!props.refresh);
				swal.close();
				store.addNotification(
					buildToast(
						'success',
						'Success',
						'Lecturer Updated Successfully'
					)
				);
			})
			.catch((err) => {
				console.log(err.response);
				store.addNotification(
					buildToast('danger', 'Failed!', 'Error Updating Data!')
				);
			});
	};

	useEffect(() => {
		axios
			.get('https://time-table-manager.herokuapp.com/api/v1/buildings')
			.then((res) => {
				setBuildings(res.data.data.buildings);
			})
			.catch((err) => {
				console.log(err.response);
			});
	}, []);

	return (
		<div>
			<div className='dcdb-dialog-container'>
				<h5 className='text-left m-0'>Update Lecturer</h5>
				<hr />
				<div className='form-row'>
					<div className='form-group col'>
						<label className='dialog-label'>Name</label>
						<input
							type='text'
							className={
								isNameVaid
									? 'form-control'
									: 'form-control is-invalid'
							}
							value={name}
							onChange={onNameChange}
						/>
						<div className='invalid-feedback'>
							Please enter a name
						</div>
					</div>

					<div className='form-group col'>
						<label className='dialog-label'>Faculty</label>
						<input
							type='text'
							className={
								isFacultyValid
									? 'form-control'
									: 'form-control is-invalid'
							}
							value={faculty}
							onChange={onFacultyChange}
						/>
						<div className='invalid-feedback'>
							Please enter a faculty
						</div>
					</div>
				</div>

				<div className='form-row'>
					<div className='form-group col-6'>
						<label className='dialog-label'>Center</label>
						<input
							type='text'
							className={
								isCenterValid
									? 'form-control'
									: 'form-control is-invalid'
							}
							onChange={onCenterChange}
							value={center}
						/>
						<div className='invalid-feedback'>
							Please enter center
						</div>
					</div>
					<div className='form-group col-6'>
						<label className='dialog-label'>Level</label>
						<select
							value={level}
							onChange={(e) => onLevelChange(e)}
							name='level'
							className='form-control'
							id='level-select'
						>
							<option value='Professor'>Professor</option>
							<option value='Assistant Professor'>
								Assistant Professor
							</option>
							<option value='Senior Lecturer(HG)'>
								Senior Lecturer(HG)
							</option>
							<option value='Senior Lecturer'>
								Senior Lecturer
							</option>
							<option value='Lecturer'>Lecturer</option>
							<option value='Assistant Lecturer'>
								Assistant Lecturer
							</option>
							<option value='Instructor'>Instructor</option>
						</select>
					</div>
				</div>

				<div className='form-row'>
					{' '}
					{/*second row */}
					<div className='form-group col-6'>
						<label className='dialog-label'>Employee Id</label>
						<input
							type='text'
							className={
								isEmpIdValid
									? 'form-control'
									: 'form-control is-invalid'
							}
							onChange={onEmpIdChange}
							value={employeeId}
						/>
						<div className='invalid-feedback'>
							Please enter a Emp Id
						</div>
					</div>
					<div className='form-group col-6'>
						<label className='dialog-label'>Department</label>
						<input
							type='text'
							className={
								isDepartmentValid
									? 'form-control'
									: 'form-control is-invalid'
							}
							onChange={onDepartmentChange}
							value={department}
						/>
						<div className='invalid-feedback'>
							Please enter a department
						</div>
					</div>
					<div className='form-group col-6'>
						<label className='dialog-label'>Building</label>
						<select
							value={building}
							onChange={(e) => onBuildingChange(e)}
							name='building'
							className='form-control'
							id='building-select'
						>
							{buildings.length > 0 ? (
								buildings.map((name) => {
									return (
										<option
											key={name._id}
											value={name.buildingName}
										>
											{name.buildingName}
										</option>
									);
								})
							) : (
								<option>Insert a building!</option>
							)}
						</select>
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
	);
};

export default UpdateLecturerDialogBox;
