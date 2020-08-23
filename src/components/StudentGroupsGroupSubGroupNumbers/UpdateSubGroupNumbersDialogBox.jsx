import React, { useState } from 'react';
import swal from '@sweetalert/with-react';

import './updateSubGroupNumbersDialogBox.css';

const UpdateSubGroupNumbersDialogBox = (props) => {

	const [subGroupNumber, setSubGroupNumber] = useState(props.itemName);

	const onSubGroupNumberChange = (e) => {
		setSubGroupNumber(e.target.value);
	};

	return (
		<div className='dcdb-dialog-container'>
			<h5 className='text-left m-0'>Update Sub-Group Number</h5>
			<hr />

			<div className='form-row'>
				<div className='form-group col-12'>
					<label className='dialog-label'>Sub-Group Number</label>
					<input
						type='text'
						className='form-control'
						placeholder='00'
						onChange={onSubGroupNumberChange}
						value={subGroupNumber}
					/>
				</div>
			</div>
			<hr />

			<button
				className='btn btn-info float-right mb-4'
				onClick={() => props.editEventHandler(subGroupNumber, props.id)}
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

export default UpdateSubGroupNumbersDialogBox;
