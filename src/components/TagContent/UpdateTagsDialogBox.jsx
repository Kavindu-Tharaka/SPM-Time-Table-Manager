import React, { useState } from 'react';
import swal from '@sweetalert/with-react';

import './updateTagsDialogBox.css';

const UpdateTagsDialogBox = (props) => {

	const [tag, setTag] = useState(props.itemName);

	const onTagChange = (e) => {
		setTag(e.target.value);
	};

	return (
		<div className='dcdb-dialog-container'>
			<h5 className='text-left m-0'>Update Tag</h5>
			<hr />

			<div className='form-row'>
				<div className='form-group col-12'>
					<label className='dialog-label'>Tag</label>
					<input
						type='text'
						className='form-control'
						placeholder='00'
						onChange={onTagChange}
						value={tag}
					/>
				</div>
			</div>
			<hr />

			<button
				className='btn btn-info float-right mb-4'
				onClick={() => props.editEventHandler(tag, props.id)}
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

export default UpdateTagsDialogBox;
