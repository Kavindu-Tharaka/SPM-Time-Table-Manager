import React, { useState } from 'react';
import axios from 'axios';
import { IoMdClose, IoMdCreate } from 'react-icons/io';
import swal from '@sweetalert/with-react';
import { store } from 'react-notifications-component';
import { buildToast } from '../../../util/toast';

import './buildingCard.css';
import DeleteConfirmationDialogBox from '../../DeleteConfirmationDialogBox/DeleteConfirmationDialogBox';
import UpdateBuildingDialogBox from '../../UpdateBuildingDialogBox/UpdateBuildingDialogBox';

const BuildingCard = (props) => {
	const deleteBuilding = () => {
		axios
			.delete(
				`https://time-table-manager.herokuapp.com/api/v1/buildings/${props.building._id}`
			)
			.then((res) => {
				swal.close();
				props.refreshComponent();
				store.addNotification(
					buildToast(
						'danger',
						'Deleted',
						'Building Deleted Successfully'
					)
				);
			})
			.catch((err) => {
				console.log(err.response);
			});
	};

	const onUpdateClick = () => {
		swal({
			buttons: false,
			content: (
				<UpdateBuildingDialogBox
					building={props.building}
					refreshComponent={props.refreshComponent}
				/>
			),
		});
	};

	const onDeleteClick = () => {
		swal({
			buttons: false,
			content: (
				<DeleteConfirmationDialogBox
					deleteEventHandler={deleteBuilding}
					itemName={props.building.buildingName}
				/>
			),
		});
	};

	return (
		<div className='bc-building-card-container col p-1'>
			<div className='card pt-3 pb-3 pl-2'>
				<h5>{props.building.buildingName}</h5>
				<button
					className='sm-ctrl-btn sm-ctrl-btn-upt bc-sm-ctrl-btn-upt'
					onClick={onUpdateClick}
				>
					<IoMdCreate />
				</button>
				<button
					className='sm-ctrl-btn sm-ctrl-btn-dlt bc-sm-ctrl-btn-dlt'
					onClick={onDeleteClick}
				>
					<IoMdClose />
				</button>
				<p className='m-0'>12 Lecture Halls | 13 Laboratories</p>
			</div>
		</div>
	);
};

export default BuildingCard;
