import React from 'react';
import swal from '@sweetalert/with-react';

import './deleteConfirmationDialogBox.css';

const DeleteConfirmationDialogBox = (props) => {
	const onDeleteClick = () => {
		props.deleteEventHandler();
	};

	return (
		<div className='dcdb-dialog-container'>
			<h5 className='text-left m-0'>
				Are you sure you want to delete selected item?
			</h5>
			<p className='text-left'>
				<small>
					It will be permanently deleted and cannot be recovered
				</small>
			</p>
			<p className='text-left'>{props.itemName}</p>
			<button
				className='btn btn-danger float-right mb-4'
				onClick={onDeleteClick}
			>
				Delete
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

export default DeleteConfirmationDialogBox;
