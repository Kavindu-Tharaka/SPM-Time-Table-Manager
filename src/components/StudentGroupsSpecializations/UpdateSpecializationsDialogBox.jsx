import React, { useState } from 'react';
import swal from '@sweetalert/with-react';

import './updateSpecializationsDialogBox.css';

const UpdateSpecializationsDialogBox = (props) => {

	const [specialization, setSpecialization] = useState(props.itemName);

	const onSpecializationChange = (e) => {
		setSpecialization(e.target.value);
	};

	return (
		<div className='dcdb-dialog-container'>
			<h5 className='text-left m-0'>Update Specialization</h5>
			<hr />

			<div className='form-row'>
				<div className='form-group col-12'>
					<label className='dialog-label'>Specialization</label>
					<input
						type='text'
						className='form-control'
						placeholder='00'
						onChange={onSpecializationChange}
						value={specialization}
					/>
				</div>
			</div>
			<hr />

			<button
				className='btn btn-info float-right mb-4'
				onClick={() => props.editEventHandler(specialization, props.id)}
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

export default UpdateSpecializationsDialogBox;
