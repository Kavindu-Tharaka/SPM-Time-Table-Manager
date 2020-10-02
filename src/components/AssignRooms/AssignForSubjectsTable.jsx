import React from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { IoMdClose } from 'react-icons/io';
import swal from '@sweetalert/with-react';
import DeleteConfirmationDialogBox from '../DeleteConfirmationDialogBox/DeleteConfirmationDialogBox';
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';

const AssignForSubjectsTable = (props) => {
	const removeSubject = (roomIdAndSubjectId) => {
		const roomId = roomIdAndSubjectId.split('_')[0];
		const subjectId = roomIdAndSubjectId.split('_')[1];
		const room = props.rooms.find((room) => room._id === roomId);

		const subjectIds = room.assignedSubjects.filter(
			(subject) => subject._id !== subjectId
		);

		axios
			.patch(
				`https://time-table-manager.herokuapp.com/api/v1/rooms/${room._id}`,
				{
					assignedSubjects: [...subjectIds],
				}
			)
			.then((res) => {
				swal.close();
				store.addNotification(
					buildToast('danger', 'Success', 'Subject Removed')
				);
				props.refreshComponent();
			})
			.catch((err) => {
				console.log(err.response);
			});
	};

	const onDeleteClick = (room, subject) => {
		swal({
			buttons: false,
			content: (
				<DeleteConfirmationDialogBox
					deleteEventWithIdHandler={removeSubject}
					itemId={`${room._id}_${subject._id}`}
					itemName={`${subject.subjectCode} - ${subject.subjectName}`}
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
		{ name: 'Capacity', selector: 'capacity', sortable: true },
		{ name: 'Room Type', selector: 'roomType', sortable: true },
		{
			name: 'Allocated Subjects',
			cell: (row) => (
				<div className='cell'>
					{row.assignedSubjects.map((subject) => (
						<div key={subject._id} className='row'>
							<div className='col-8'>
								<p>{subject.subjectCode}</p>
							</div>
							<div className='col-4'>
								<button
									className='sm-ctrl-btn sm-ctrl-btn-dlt afs-sm-ctrl-btn-dlt'
									onClick={() => {
										onDeleteClick(row, subject);
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

export default AssignForSubjectsTable;
