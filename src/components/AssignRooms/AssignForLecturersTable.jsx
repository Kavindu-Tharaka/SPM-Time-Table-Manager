import React from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { IoMdClose } from 'react-icons/io';
import swal from '@sweetalert/with-react';
import DeleteConfirmationDialogBox from '../DeleteConfirmationDialogBox/DeleteConfirmationDialogBox';
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';

const AssignForLecturersTable = (props) => {
	const removeLecturer = (roomIdAndLecturerId) => {
		const roomId = roomIdAndLecturerId.split('_')[0];
		const lecturerId = roomIdAndLecturerId.split('_')[1];
		const room = props.rooms.find((room) => room._id === roomId);

		const lecturerIds = room.assignedLecturers.filter(
			(lecturer) => lecturer._id !== lecturerId
		);

		axios
			.patch(`http://localhost:8000/api/v1/rooms/${room._id}`, {
				assignedLecturers: [...lecturerIds],
			})
			.then(() => {
				swal.close();
				store.addNotification(
					buildToast('danger', 'Success', 'Lecturer Removed')
				);
				props.refreshComponent();
			})
			.catch((err) => {
				console.log(err.response);
			});
	};

	const onDeleteClick = (room, lecturer) => {
		swal({
			buttons: false,
			content: (
				<DeleteConfirmationDialogBox
					deleteEventWithIdHandler={removeLecturer}
					itemId={`${room._id}_${lecturer._id}`}
					itemName={`${room.roomName} - ${lecturer.name}`}
				/>
			),
		});
	};

	const columns = [
		{ name: 'ID', selector: '_id', omit: true },
		{ name: 'Building', selector: 'building', omit: true },
		{
			name: 'Building',
			selector: 'building.buildingName',
			sortable: true,
		},
		{ name: 'Room Name', selector: 'roomName', sortable: true },
		{ name: 'Floor', selector: 'floor', sortable: true },
		{ name: 'Capacity', selector: 'capacity', sortable: true },
		{ name: 'Room Type', selector: 'roomType', sortable: true },
		{
			name: 'Allocated Lecturers',
			cell: (row) => (
				<div className='cell'>
					{row.assignedLecturers.map((lecturer) => (
						<div key={lecturer._id} className='row'>
							<div className='col-8'>
								<p>{lecturer.name}</p>
							</div>
							<div className='col-4'>
								<button
									className='sm-ctrl-btn sm-ctrl-btn-dlt afs-sm-ctrl-btn-dlt'
									onClick={() => {
										onDeleteClick(row, lecturer);
									}}
								>
									<IoMdClose />
								</button>
							</div>
						</div>
					))}
				</div>
			),
		},
	];

	return (
		<DataTable
			title='Allocated Rooms'
			data={props.rooms}
			columns={columns}
			pagination
			dense
		/>
	);
};

export default AssignForLecturersTable;
