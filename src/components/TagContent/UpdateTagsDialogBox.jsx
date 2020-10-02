import React, { useState } from 'react';
import swal from '@sweetalert/with-react';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';
import './updateTagsDialogBox.css';

const UpdateTagsDialogBox = (props) => {
	const [tag, setTag] = useState(props.itemName);

	const tagList = props.itemList;
	const setTagList = props.setItemList;

	const [isTagNameValid, setIsTagNameValid] = useState(true);
	const [errorMsg, setErrorMsg] = useState('');

	const [isUpdating, setIsUpdating] = useState(false);

	const onTagChange = (e) => {
		setTag(e.target.value);
	};

	const editTagName = (tagName, id) => {
		if (tagName === '') {
			setIsTagNameValid(false);
			setErrorMsg('Please Enter a Tag Name!');
		} else {
			if (props.itemName !== tagName) {
				let isExist = false;
				setIsUpdating(true);

				tagList.forEach((element) => {
					if (element.tagname === tagName) {
						setIsTagNameValid(false);
						setErrorMsg(
							'The Tag Name You Entered is Already Exists!'
						);
						isExist = true;
						setIsUpdating(false);
						setTag('');
					}
				});

				if (!isExist) {
					axios
						.patch(
							`https://time-table-manager.herokuapp.com/api/v1/tags/${id}`,
							{
								tagname: tagName,
							}
						)
						.then((res) => {
							setTagList((prevlist) =>
								prevlist.map((listItem) =>
									id === listItem._id
										? {
												...listItem,
												tagname: tagName,
										  }
										: listItem
								)
							);
							swal.close();
							setIsUpdating(false);
							store.addNotification(
								buildToast(
									'info',
									'Updated',
									'Tag Updated Successfully'
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
			<h5 className='text-left m-0'>Update Tag</h5>
			<hr />

			<div className='form-row'>
				<div className='form-group col-12'>
					<input
						type='text'
						className={
							isTagNameValid
								? 'form-control'
								: 'form-control is-invalid'
						}
						placeholder='Tag name'
						onChange={onTagChange}
						value={tag}
					/>
					<div
						style={{ textAlign: 'left' }}
						className='invalid-feedback'
					>
						{errorMsg}
					</div>
				</div>
			</div>

			<button
				className='btn btn-info float-right mb-4'
				onClick={() => editTagName(tag, props.id)}
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

export default UpdateTagsDialogBox;
