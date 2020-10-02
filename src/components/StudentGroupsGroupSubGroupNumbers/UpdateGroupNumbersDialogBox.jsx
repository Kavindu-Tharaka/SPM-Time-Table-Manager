import React, { useState } from 'react';
import swal from '@sweetalert/with-react';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';

import './updateGroupNumbersDialogBox.css';

const UpdateGroupNumbersDialogBox = (props) => {
	const [groupNumber, setGroupNumber] = useState(props.itemName);

	const groupNumberList = props.groupNumberList;
	const setGroupNumberList = props.setGroupNumberList;

	const [isGroupNumberValid, setIsGroupNumberValid] = useState(true);
	const [groupNumberErrorMsg, setGroupNumberErrorMsg] = useState('');
	const [isUpdating, setIsUpdating] = useState(false);

	const onGroupNumberChange = (e) => {
		if (e.target.value > 0 || e.target.value === '')
			setGroupNumber(e.target.value);
		setIsGroupNumberValid(true);
		setGroupNumberErrorMsg('');
	};

	const editGroupNumber = (groupNumber, id) => {
		if (groupNumber === '' || groupNumber === '0') {
			setIsGroupNumberValid(false);
			setGroupNumberErrorMsg('Please Enter a Valid Group Number!');
			setGroupNumber('');
		} else if (!/^[+]?\d+([.]\d+)?$/.test(groupNumber)) {
			setIsGroupNumberValid(false);
			setGroupNumberErrorMsg('Group Number Should be a Positive Number!');
			setGroupNumber('');
		} else {
			if (groupNumber !== props.itemName) {
				let isExist = false;
				setIsUpdating(true);

				groupNumberList.forEach((element) => {
					if (
						parseInt(element.groupnumber) === parseInt(groupNumber)
					) {
						setIsGroupNumberValid(false);
						setGroupNumberErrorMsg(
							'The Group Number You Entered is Already Exist!'
						);
						setGroupNumber('');
						setIsUpdating(false);
						isExist = true;
					}
				});

				if (!isExist) {
					axios
						.patch(
							`https://time-table-manager.herokuapp.com/api/v1/groupnumbers/${id}`,
							{
								groupnumber: groupNumber,
							}
						)
						.then((res) => {
							setGroupNumberList((prevlist) =>
								prevlist.map((listItem) =>
									id === listItem._id
										? {
												...listItem,
												groupnumber: groupNumber,
										  }
										: listItem
								)
							);
							setIsUpdating(false);
							swal.close();
							store.addNotification(
								buildToast(
									'info',
									'Updated',
									'Group number Updated Successfully'
								)
							);
						})
						.catch((err) => console.log(err));
				}
			} else {
				swal.close();
			}
		}
	};

	return (
		<div className='dcdb-dialog-container'>
			<h5 className='text-left m-0'>Update Group Number</h5>
			<hr />

			<div className='form-row'>
				<div className='form-group col-12'>
					<input
						type='number'
						className={
							isGroupNumberValid
								? 'form-control'
								: 'form-control is-invalid'
						}
						placeholder='Group Number'
						onChange={onGroupNumberChange}
						value={groupNumber}
					/>
					<div
						style={{ textAlign: 'left' }}
						className='invalid-feedback'
					>
						{groupNumberErrorMsg}
					</div>
				</div>
			</div>
			<button
				className='btn btn-info float-right mb-4'
				onClick={() => editGroupNumber(groupNumber, props.id)}
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

export default UpdateGroupNumbersDialogBox;
