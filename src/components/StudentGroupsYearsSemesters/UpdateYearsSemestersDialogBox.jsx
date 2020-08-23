import React, { useState } from 'react';
import swal from '@sweetalert/with-react';
import axios from 'axios';

import './updateYearsSemestersDialogBox.css';

const UpdateYearsSemestersDialogBox = (props) => {

	const [year, setYear] = useState(parseInt(props.itemName.substring(1, 2)));
	const [semester, setSemester] = useState(parseInt(props.itemName.substring(4, 5)));

	const onYearChange = (e) => {
		setYear(e.target.value);
	};

	const onSemesterChange = (e) => {
		setSemester(e.target.value);
	};

	return (
		<div className='dcdb-dialog-container'>
			<h5 className='text-left m-0'>Update Year & Semester</h5>
			<hr />

			<div className='form-row'>
				<div className='form-group col-6'>
					<label className='dialog-label'>Year</label>
					<input
						type='number'
						className='form-control'
						onChange={onYearChange}
						value={year}
					/>
				</div>
				<div className='form-group col-6'>
					<label className='dialog-label'>Semester</label>
					<input
						type='number'
						className='form-control'
						onChange={onSemesterChange}
						value={semester}
					/>
				</div>
			</div>
			<hr />

			<button
				className='btn btn-info float-right mb-4'
				onClick={() => props.editEventHandler(year, semester, props.id)}
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

export default UpdateYearsSemestersDialogBox;
