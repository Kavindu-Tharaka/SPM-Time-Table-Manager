import React, { useState } from 'react';
import swal from '@sweetalert/with-react';
import axios from 'axios';
import './updateSubGroupIDsDialogBox.css';
import { FaSpinner } from 'react-icons/fa';
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';

const UpdateSubGroupIDsDialogBox = (props) => {
	const [groupID, setGroupID] = useState(
		`${props.itemName.split('.')[0]}.${props.itemName.split('.')[1]}.${
			props.itemName.split('.')[2]
		}.${props.itemName.split('.')[3]}`
	);

	const [subGroupNumber, setSubGroupNumber] = useState(
		props.itemName.split('.')[4]
	);
	const [subGroupNumberList, setSubGroupNumberList] = useState(
		props.subGroupNumberList
	);

	const [isSubGroupIDValid, setIsSubGroupIDValid] = useState(true);
	const [isUpdating, setIsUpdating] = useState(false);

	const onInputChangeGroupID = (e) => {
		setGroupID(e.target.value);
		setIsSubGroupIDValid(true);
		console.log(groupID);
	};
	const onInputChangeSubGroupNumber = (e) => {
		setSubGroupNumber(e.target.value);
		setIsSubGroupIDValid(true);
		console.log(subGroupNumber);
	};

	const editSubGroupID = () => {
		if (`${groupID}.${subGroupNumber}` !== props.itemName) {
			let isExist = false;
			setIsUpdating(true);

			props.subGroupIDList.forEach((element) => {
				if (
					`${element.groupid}.${element.subgroupnumber}` ===
						`${groupID}.${subGroupNumber}` ||
					(element.groupid.split('.')[3] < 10 &&
						`${element.groupid.split('.')[0]}.${
							element.groupid.split('.')[1]
						}.${element.groupid.split('.')[2]}.0${
							element.groupid.split('.')[3]
						}.${element.subgroupnumber}` ===
							`${groupID}.${subGroupNumber}`)
				) {
					setIsSubGroupIDValid(false);

					setIsUpdating(false);
					isExist = true;
				}
			});

			if (!isExist) {
				const subgroupid = `${groupID}.${subGroupNumber}`;

				axios
					.patch(
						`https://time-table-manager.herokuapp.com/api/v1/subgroupids/${props.id}`,
						{
							subgroupnumber: subGroupNumber,
							subgroupid: subgroupid,
						}
					)
					.then(function (response) {
						props.setSubGroupIDList((prevlist) =>
							prevlist.map((listItem) =>
								props.id === listItem._id
									? {
											...listItem,
											// groupid: groupID,
											subgroupnumber: subGroupNumber,
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
								'Sub-Group ID Updated Successfully'
							)
						);
					})
					.catch(function (error) {
						console.log(error);
					});
			}
		} else {
			swal.close();
		}
	};

	return (
		<div className='dcdb-dialog-container'>
			<h5 className='text-left m-0'>{'Update Year & Semester'}</h5>
			<hr />

			{!isSubGroupIDValid ? (
				<div
					style={{
						color: 'crimson',
						textAlign: 'left',
						fontSize: 14,
					}}
				>
					The Sub Group ID You Entered is Already Exists!
				</div>
			) : null}

			<div className='form-row'>
				<div className='form-group col'>
					<label className='dialog-label'>Group ID</label>
					<select
						className='br-0 form-control form-control'
						onChange={onInputChangeGroupID}
						value={groupID}
					>
						<option value={groupID}>{groupID}</option>
					</select>
				</div>
			</div>

			<div className='form-row'>
				<div className='form-group col'>
					<label className='dialog-label'>Sub-Group Number</label>
					<select
						className='br-0 form-control form-control'
						onChange={onInputChangeSubGroupNumber}
						value={subGroupNumber}
					>
						{subGroupNumberList.map((item) => (
							<option key={item._id} value={item.subgroupnumber}>
								{item.subgroupnumber}
							</option>
						))}
					</select>
				</div>
			</div>

			<button
				className='btn btn-info float-right mb-4'
				onClick={editSubGroupID}
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

export default UpdateSubGroupIDsDialogBox;
