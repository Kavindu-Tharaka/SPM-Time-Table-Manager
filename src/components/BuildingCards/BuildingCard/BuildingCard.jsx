import React from 'react';
import axios from 'axios';
import { IoMdClose, IoMdCreate } from 'react-icons/io';
import swal from '@sweetalert/with-react';

import './buildingCard.css';

const BuildingCard = (props) => {
	const deleteBuilding = () => {
		axios
			.delete(
				`http://localhost:8000/api/v1/buildings/${props.building._id}`
			)
			.then((res) => {
				swal.close();
			})
			.catch((err) => {
				console.log(err.response);
			});
	};

	const onDeleteClick = () => {
		swal({
			buttons: false,
			content: (
				<div className='p-2'>
					<h5 className='m-0 text-left'>
						Are you really want to delete this?
					</h5>
					<p className='m-0 text-left'>It cannot be recovered</p>
					<button className='btn btn-danger float-right mt-5 mb-4' onClick={deleteBuilding}>
						Delete
					</button>
				</div>
			),
		});
	};

	return (
		<div className='bc-building-card-container card col mb-4 p-2 m-2'>
			<h4>{props.building.buildingName}</h4>
			<button className='sm-ctrl-btn sm-ctrl-btn-upt bc-sm-ctrl-btn-dlt'>
				<IoMdCreate />
			</button>
			<button
				className='sm-ctrl-btn sm-ctrl-btn-dlt bc-sm-ctrl-btn-upt'
				onClick={onDeleteClick}
			>
				<IoMdClose />
			</button>
			<p className='m-0'>12 Lecture Halls | 13 Laboratories</p>
		</div>
	);
};

export default BuildingCard;
