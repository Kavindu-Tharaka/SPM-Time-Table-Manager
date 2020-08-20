import React, { useState } from 'react';
import swal from '@sweetalert/with-react';
import axios from 'axios';

const UpdateBuildingDialogBox = (props) => {
	const [buildingName, setBuildingName] = useState(
		props.building.buildingName
	);

	const onBuildingNameChange = (e) => {
		setBuildingName(e.target.value);
	};

	const onUpdateClick = () => {
		axios
			.patch(
				`http://localhost:8000/api/v1/buildings/${props.building._id}`,
				{ buildingName }
			)
			.then((res) => {
				swal.close();
				props.refreshComponent();
			})
			.catch((err) => {
				console.log(err.response);
			});
	};

	return (
		<div className='dcdb-dialog-container'>
			<h5 className='text-left m-0'>Update Building</h5>
			<hr />

			<div className='form-group'>
				<label className='float-left'>Room Name</label>
				<input
					type='text'
					className='form-control mb-4'
					placeholder='Building Name'
					onChange={onBuildingNameChange}
					value={buildingName}
				/>
			</div>

			<p className='text-left'>{props.itemName}</p>
			<button
				className='btn btn-info float-right mb-4'
				onClick={onUpdateClick}
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

export default UpdateBuildingDialogBox;
