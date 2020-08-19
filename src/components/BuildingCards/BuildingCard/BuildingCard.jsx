import React from 'react';
import axios from 'axios';
import { IoMdClose, IoMdCreate } from 'react-icons/io';
import swal from '@sweetalert/with-react';

import './buildingCard.css';
import DeleteConfirmationDialogBox from '../../DeleteConfirmationDialogBox/DeleteConfirmationDialogBox';

const BuildingCard = (props) => {
	const deleteBuilding = () => {
		axios
			.delete(
				`http://localhost:8000/api/v1/buildings/${props.building._id}`
			)
			.then((res) => {
				swal.close();
				props.refreshComponent();
			})
			.catch((err) => {
				console.log(err.response);
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
				<button className='sm-ctrl-btn sm-ctrl-btn-upt bc-sm-ctrl-btn-upt'>
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
