import React from 'react';
import swal from '@sweetalert/with-react';
import { FaSpinner } from 'react-icons/fa';

import './deleteConfirmationDialogBox.css';
import { useState } from 'react';

const DeleteConfirmationDialogBox = (props) => {
	// Loading
	const [isDeleting, setIsDeleting] = useState(false);

	const onDeleteClick = () => {
		if (
			props.deleteEventHandler !== undefined &&
			props.deleteEventWithIdHandler === undefined
		) {
			setIsDeleting(true);
			props.deleteEventHandler();
		}

		if (
			props.deleteEventWithIdHandler !== undefined &&
			props.itemId !== undefined
		) {
			setIsDeleting(true);
			props.deleteEventWithIdHandler(props.itemId);
		}
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
				className='btn btn-info float-right mb-4'
				onClick={onDeleteClick}
			>
				{isDeleting ? (
					<div>
						Deleting <FaSpinner className='spin' />
					</div>
				) : (
					'Delete'
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

export default DeleteConfirmationDialogBox;
